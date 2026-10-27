#!/usr/bin/env node
/**
 * Daily indexing state for blog.youmake.dev, run by scripts/indexing/run-daily.sh.
 * Tracks every sitemap URL in ~/.youmake-indexing/state.json until Google reports
 * it indexed.
 *
 *   node scripts/indexing/indexing.mjs sync              add new sitemap URLs to the state
 *   node scripts/indexing/indexing.mjs to-inspect [N]     URLs whose Google status should be checked
 *   node scripts/indexing/indexing.mjs to-request [N]     not-indexed URLs to request in Search Console
 *   node scripts/indexing/indexing.mjs mark <url> <indexed|not-indexed> [coverage text]
 *   node scripts/indexing/indexing.mjs requested <url>    record a "Request indexing" click
 *   node scripts/indexing/indexing.mjs indexnow           submit not-indexed URLs to IndexNow (weekly per URL)
 *   node scripts/indexing/indexing.mjs status             summary; exit code 0 when the job is finished
 *
 * The job is finished when every URL is indexed or has had MAX_REQUESTS
 * "Request indexing" clicks: a page Google crawled and still won't index needs
 * better content, not more requests.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://blog.youmake.dev';
const STATE_DIR = path.join(os.homedir(), '.youmake-indexing');
const STATE_FILE = path.join(STATE_DIR, 'state.json');
const KEY_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../public/indexnow-key.txt');
const DAY = 24 * 60 * 60 * 1000;
// Google ignores repeat requests for a queued URL, so give each request a week to land.
const REQUEST_EVERY_DAYS = 7;
const INDEXNOW_EVERY_DAYS = 7;
// Indexed pages are rechecked rarely; unindexed ones every other day.
const RECHECK_INDEXED_DAYS = 30;
const RECHECK_PENDING_DAYS = 2;
const MAX_REQUESTS = 3;

// Pages Google hasn't crawled gain the most from a request; "Crawled - currently
// not indexed" is a quality verdict that a request rarely changes, so it goes last.
function requestPriority(coverage = '') {
  if (/unknown/i.test(coverage)) return 0;
  if (/discovered/i.test(coverage)) return 1;
  return 2;
}

const exhausted = (u) => (u.requests ?? 0) >= MAX_REQUESTS;

function load() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch {
    return { urls: {} };
  }
}

function save(state) {
  fs.mkdirSync(STATE_DIR, { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + '\n');
}

const daysSince = (iso) => (iso ? (Date.now() - new Date(iso).getTime()) / DAY : Infinity);

async function sync(state) {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  const entries = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?/g)];
  let added = 0;
  for (const [, url, lastmod] of entries) {
    if (!state.urls[url]) {
      state.urls[url] = { status: 'unknown', lastmod: lastmod ?? null };
      added++;
    } else if (lastmod) {
      state.urls[url].lastmod = lastmod;
    }
  }
  console.log(`sitemap: ${entries.length} URLs, ${added} new`);
}

// Newest pages first: they are the ones most likely to be missing from Google.
const byNewest = ([, a], [, b]) => String(b.lastmod ?? '').localeCompare(String(a.lastmod ?? ''));

function toInspect(state, limit) {
  return Object.entries(state.urls)
    .filter(([, u]) =>
      u.status === 'indexed' ? daysSince(u.checkedAt) > RECHECK_INDEXED_DAYS : daysSince(u.checkedAt) > RECHECK_PENDING_DAYS)
    .sort(byNewest)
    .slice(0, limit)
    .map(([url]) => url);
}

function toRequest(state, limit) {
  return Object.entries(state.urls)
    .filter(([, u]) => u.status === 'not-indexed' && !exhausted(u) && daysSince(u.requestedAt) > REQUEST_EVERY_DAYS)
    .sort((a, b) => requestPriority(a[1].coverage) - requestPriority(b[1].coverage) || byNewest(a, b))
    .slice(0, limit)
    .map(([url]) => url);
}

async function indexnow(state) {
  const urls = Object.entries(state.urls)
    .filter(([, u]) => u.status !== 'indexed' && daysSince(u.indexnowAt) > INDEXNOW_EVERY_DAYS)
    .map(([url]) => url);
  if (!urls.length) return console.log('indexnow: nothing to submit');
  const key = fs.readFileSync(KEY_FILE, 'utf8').trim();
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(SITE).host, key, keyLocation: `${SITE}/${key}.txt`, urlList: urls }),
  });
  console.log(`indexnow: ${urls.length} URLs submitted (${res.status})`);
  if (res.ok) {
    const now = new Date().toISOString();
    for (const url of urls) state.urls[url].indexnowAt = now;
  }
}

function status(state) {
  const all = Object.values(state.urls);
  const count = (s) => all.filter((u) => u.status === s).length;
  const gaveUp = all.filter((u) => u.status === 'not-indexed' && exhausted(u)).length;
  const finished = all.length > 0 && all.every((u) => u.status === 'indexed' || (u.status === 'not-indexed' && exhausted(u)));
  console.log(`total ${all.length}: indexed ${count('indexed')}, not indexed ${count('not-indexed')} (${gaveUp} after ${MAX_REQUESTS} requests), unknown ${count('unknown')}${finished ? ' - finished' : ''}`);
  return finished;
}

const [command, ...args] = process.argv.slice(2);
const state = load();

switch (command) {
  case 'sync':
    await sync(state);
    save(state);
    break;
  case 'to-inspect':
    console.log(toInspect(state, Number(args[0] ?? 300)).join('\n'));
    break;
  case 'to-request':
    console.log(toRequest(state, Number(args[0] ?? 10)).join('\n'));
    break;
  case 'mark': {
    const [url, value, ...coverage] = args;
    if (!state.urls[url] || !['indexed', 'not-indexed'].includes(value)) {
      console.error('usage: mark <sitemap url> <indexed|not-indexed> [coverage]');
      process.exit(1);
    }
    Object.assign(state.urls[url], { status: value, coverage: coverage.join(' ') || undefined, checkedAt: new Date().toISOString() });
    save(state);
    break;
  }
  case 'requested':
    if (!state.urls[args[0]]) {
      console.error('usage: requested <sitemap url>');
      process.exit(1);
    }
    state.urls[args[0]].requestedAt = new Date().toISOString();
    state.urls[args[0]].requests = (state.urls[args[0]].requests ?? 0) + 1;
    save(state);
    break;
  case 'indexnow':
    await indexnow(state);
    save(state);
    break;
  case 'status':
    process.exit(status(state) ? 0 : 1);
    break;
  default:
    console.error('commands: sync | to-inspect [N] | to-request [N] | mark | requested | indexnow | status');
    process.exit(1);
}
