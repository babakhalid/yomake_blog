import { ImageResponse } from 'next/og';
import sharp from 'sharp';
import { getAllArticles, getArticleBySlug, getArticleTopic, readPublicFile } from '@/utils/articles';
import { SITE_NAME } from '@/utils/site';
import { OG_SIZE, ogImageFor } from '@/utils/seo';

// Social cards, built once at deploy. X, LinkedIn and Facebook ignore SVG og:images
// and reject very large files, so covers (some are 5 MB PNGs) are resized to a
// 1200×630 JPEG; articles without a cover, and the site default, get a title card.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { image: 'default.png' },
    ...getAllArticles().map((article) => ({ image: ogImageFor(article).replace('/og/', '') })),
  ];
}

function titleCard(title: string, eyebrow: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(180deg, #8fc6f3 0%, #d8efff 55%, #ffffff 100%)',
          color: '#050505',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, fontWeight: 600, color: '#245FC9' }}>{eyebrow}</div>
        <div style={{ display: 'flex', fontSize: title.length > 70 ? 56 : 68, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
          {title}
        </div>
        <div style={{ display: 'flex', fontSize: 30, fontWeight: 600 }}>{SITE_NAME} · blog.youmake.dev</div>
      </div>
    ),
    OG_SIZE,
  );
}

export async function GET(_request: Request, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params;
  if (image === 'default.png') {
    return titleCard('Build with AI. Read what actually works.', 'Vibe coding · AI app builders · AI agents');
  }

  const article = getArticleBySlug(image.replace(/\.(jpg|png)$/, ''));
  if (!article) return new Response('Not found', { status: 404 });

  const cover = article.frontmatter.image;
  if (cover && image.endsWith('.jpg')) {
    try {
      const jpeg = await sharp(await readPublicFile(cover))
        .resize(OG_SIZE.width, OG_SIZE.height, { fit: 'cover' })
        .jpeg({ quality: 82, mozjpeg: true })
        .toBuffer();
      return new Response(new Uint8Array(jpeg), { headers: { 'Content-Type': 'image/jpeg' } });
    } catch (error) {
      // A missing or unreadable cover shouldn't fail the deploy; the title card is a fine stand-in.
      console.warn(`og: cover for ${article.slug} unreadable, using title card:`, (error as Error).message);
    }
  }
  return titleCard(article.frontmatter.title, getArticleTopic(article).name);
}
