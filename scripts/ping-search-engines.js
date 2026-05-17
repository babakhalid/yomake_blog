#!/usr/bin/env node
/**
 * ping-search-engines.js
 * 
 * Notifies Google, Bing (via IndexNow), and other search engines about
 * new or updated URLs on blog.youmake.dev.
 * 
 * Usage:
 *   # Ping all article URLs from sitemap
 *   node scripts/ping-search-engines.js --all
 * 
 *   # Ping specific URLs
 *   node scripts/ping-search-engines.js https://blog.youmake.dev/articles/my-new-article
 * 
 *   # Ping recently added articles (from git diff)
 *   node scripts/ping-search-engines.js --new
 * 
 * Integrates with:
 *   - Google: Sitemap ping endpoint
 *   - IndexNow: Bing, Yandex, Seznam, Naver (auto-shared)
 *   - Google Search Console: Sitemap resubmission hint
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://blog.youmake.dev';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const INDEXNOW_KEY_FILE = path.join(__dirname, '../public/indexnow-key.txt');
const ARTICLES_DIR = path.join(__dirname, '../src/articles');

// ── IndexNow Key Management ─────────────────────────────────────────

function getOrCreateIndexNowKey() {
  const keyPath = INDEXNOW_KEY_FILE;
  const keyFileName = 'indexnow-key.txt';
  
  if (fs.existsSync(keyPath)) {
    return fs.readFileSync(keyPath, 'utf-8').trim();
  }
  
  // Generate a random key
  const key = Array.from({ length: 32 }, () => 
    'abcdef0123456789'[Math.floor(Math.random() * 16)]
  ).join('');
  
  fs.writeFileSync(keyPath, key);
  
  // Also create the verification file at public/<key>.txt
  const verificationPath = path.join(__dirname, '../public', `${key}.txt`);
  fs.writeFileSync(verificationPath, key);
  
  console.log(`🔑 IndexNow key created: ${key}`);
  console.log(`   Key file: public/${keyFileName}`);
  console.log(`   Verification: public/${key}.txt`);
  console.log(`   ⚠️  Commit & deploy these files for IndexNow to work!\n`);
  
  return key;
}

// ── URL Collection ───────────────────────────────────────────────────

function getAllArticleUrls() {
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));
  const urls = [`${SITE_URL}/`, `${SITE_URL}/articles`];
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8');
    // Skip unpublished
    if (content.includes('published: false')) continue;
    const slug = file.replace('.md', '');
    urls.push(`${SITE_URL}/articles/${slug}`);
  }
  
  return urls;
}

function getNewArticleUrls() {
  try {
    // Get files changed in last commit
    const diff = execSync('git diff --name-only HEAD~1 HEAD -- src/articles/', {
      cwd: path.join(__dirname, '..'),
      encoding: 'utf-8',
    }).trim();
    
    if (!diff) {
      console.log('No new articles in last commit.');
      return [];
    }
    
    return diff.split('\n')
      .filter(f => f.endsWith('.md'))
      .map(f => {
        const slug = path.basename(f, '.md');
        return `${SITE_URL}/articles/${slug}`;
      });
  } catch {
    console.log('Could not determine new articles from git. Use --all or specify URLs.');
    return [];
  }
}

// ── Google / Bing Sitemap Ping (deprecated since 2023) ──────────────
// Google and Bing deprecated their sitemap ping endpoints.
// Google: relies on sitemap.xml + Search Console
// Bing: use IndexNow instead

function logSitemapInfo() {
  console.log(`ℹ️  Google sitemap ping is deprecated — Google discovers via sitemap.xml + Search Console`);
  console.log(`ℹ️  Bing sitemap ping is deprecated — using IndexNow instead`);
}

// ── IndexNow Submission ──────────────────────────────────────────────

async function submitIndexNow(urls, key) {
  if (urls.length === 0) {
    console.log('⏭️  IndexNow: No URLs to submit.');
    return;
  }
  
  // IndexNow supports up to 10,000 URLs per request
  const batches = [];
  for (let i = 0; i < urls.length; i += 10000) {
    batches.push(urls.slice(i, i + 10000));
  }
  
  for (const batch of batches) {
    const body = {
      host: 'blog.youmake.dev',
      key: key,
      keyLocation: `${SITE_URL}/${key}.txt`,
      urlList: batch,
    };
    
    try {
      const res = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body),
      });
      
      if (res.ok || res.status === 202) {
        console.log(`✅ IndexNow: ${batch.length} URLs submitted (${res.status})`);
      } else {
        const text = await res.text().catch(() => '');
        console.log(`⚠️  IndexNow: ${res.status} ${res.statusText} — ${text}`);
      }
    } catch (err) {
      console.log(`❌ IndexNow submission failed: ${err.message}`);
    }
  }
}

// ── Main ─────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  
  console.log('🔍 Search Engine Ping — blog.youmake.dev\n');
  
  // Determine URLs to submit
  let urls = [];
  
  if (args.includes('--all')) {
    urls = getAllArticleUrls();
    console.log(`📋 Submitting ALL ${urls.length} URLs\n`);
  } else if (args.includes('--new')) {
    urls = getNewArticleUrls();
    if (urls.length > 0) {
      console.log(`📋 Submitting ${urls.length} new article(s):`);
      urls.forEach(u => console.log(`   ${u}`));
      console.log();
    }
    // Also always include homepage + articles page for freshness
    urls.unshift(`${SITE_URL}/`, `${SITE_URL}/articles`);
  } else if (args.length > 0 && !args[0].startsWith('--')) {
    urls = args.filter(a => a.startsWith('http'));
    console.log(`📋 Submitting ${urls.length} specified URL(s)\n`);
  } else {
    console.log('Usage:');
    console.log('  node scripts/ping-search-engines.js --all     # All articles');
    console.log('  node scripts/ping-search-engines.js --new     # New articles from last commit');
    console.log('  node scripts/ping-search-engines.js <url>...  # Specific URLs');
    process.exit(0);
  }
  
  // 1. Info about deprecated ping endpoints
  logSitemapInfo();
  
  // 2. IndexNow (Bing, Yandex, Seznam, Naver — auto-shared)
  const indexNowKey = getOrCreateIndexNowKey();
  await submitIndexNow(urls, indexNowKey);
  
  console.log('\n✨ Done! Search engines have been notified.');
  console.log('   Google: typically re-crawls within hours to days after sitemap ping');
  console.log('   IndexNow (Bing/Yandex): typically indexes within minutes to hours');
}

main().catch(console.error);
