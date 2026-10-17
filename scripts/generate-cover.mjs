/**
 * Generates a branded cover image for an article with Replicate and saves it as
 * public/images/blog/<slug>.jpg (1600px wide JPEG: works for cards and og:image).
 *
 *   node scripts/generate-cover.mjs <slug> "<scene description>"
 *
 * Model: openai/gpt-image-2 (same as the main app's media generator), falling back
 * to black-forest-labs/flux-schnell. Auth: REPLICATE_API_TOKEN if set; in the cloud
 * routine the token is injected by the environment's network secret instead.
 * The Youmake "Sky" art direction is appended to every prompt. Never use images
 * copied from the web: they are usually copyrighted.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const [slug, scene] = process.argv.slice(2);
if (!slug || !/^[a-z0-9-]+$/.test(slug) || !scene) {
  console.error('Usage: node scripts/generate-cover.mjs <slug> "<scene description>"');
  process.exit(1);
}

const STYLE = [
  'Editorial cover illustration for a technology blog, calm and minimal.',
  'Youmake "Sky" art direction: soft blue-to-white cloud atmosphere, whisper-grey (#F9F9FB) or deep ink (#14151C) background,',
  'a single sky-blue accent (#6D8FE3), clean hairline edges, generous negative space, soft natural light, subtle film grain.',
  'Photographic or refined 3D render, premium and understated.',
  'Absolutely no text, letters, numbers, logos, watermarks or UI copy. No purple or magenta, no neon, no rainbow gradients, no clutter.',
].join(' ');

const MODELS = [
  { id: 'openai/gpt-image-2', input: (prompt) => ({ prompt, aspect_ratio: '3:2', quality: 'high', output_format: 'png' }) },
  { id: 'black-forest-labs/flux-schnell', input: (prompt) => ({ prompt, aspect_ratio: '16:9', num_outputs: 1, output_format: 'png' }) },
];

const headers = { 'Content-Type': 'application/json', Prefer: 'wait=60' };
if (process.env.REPLICATE_API_TOKEN) headers.Authorization = `Bearer ${process.env.REPLICATE_API_TOKEN}`;

async function run(model, prompt) {
  const res = await fetch(`https://api.replicate.com/v1/models/${model.id}/predictions`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ input: model.input(prompt) }),
  });
  let prediction = await res.json();
  if (!res.ok) throw new Error(`${model.id}: HTTP ${res.status} ${prediction.detail || JSON.stringify(prediction).slice(0, 200)}`);
  const started = Date.now();
  while (!['succeeded', 'failed', 'canceled'].includes(prediction.status)) {
    if (Date.now() - started > 240_000) throw new Error(`${model.id}: timed out`);
    await new Promise((r) => setTimeout(r, 3000));
    prediction = await fetch(prediction.urls.get, { headers }).then((r) => r.json());
  }
  if (prediction.status !== 'succeeded') throw new Error(`${model.id}: ${prediction.status} ${prediction.error || ''}`);
  const url = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
  const image = await fetch(url).then((r) => r.arrayBuffer());
  return Buffer.from(image);
}

const prompt = `${scene.trim()} ${STYLE}`;
let image;
for (const model of MODELS) {
  try {
    image = await run(model, prompt);
    console.log(`Generated with ${model.id}`);
    break;
  } catch (error) {
    console.error(`Failed: ${error.message}`);
  }
}
if (!image) {
  console.error('No image generated. Publish without an `image` field rather than using a web image.');
  process.exit(2);
}

const out = path.join(root, 'public/images/blog', `${slug}.jpg`);
await sharp(image).resize({ width: 1600, height: 1000, fit: 'cover', position: 'attention' }).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
const kb = Math.round(fs.statSync(out).size / 1024);
console.log(`Saved public/images/blog/${slug}.jpg (${kb} KB). Frontmatter: image: "/images/blog/${slug}.jpg"`);
