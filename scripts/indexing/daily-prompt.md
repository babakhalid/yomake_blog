You are running the daily indexing job for blog.youmake.dev, unattended. Work only through the tools allowed for this run. Never edit files other than through the indexing script, never change Search Console settings, and never click anything in Search Console except "Request indexing" and dialog "Dismiss" buttons.

OpenSEO project id: 0b683754-05b3-4e11-bb52-14e35a7f643e

## 1. Check Google's index status

Run `node scripts/indexing/indexing.mjs to-inspect 300` to get the URLs to check today.
Inspect them with the OpenSEO `inspect_urls` tool, 10 URLs per call. For each result:

- `indexStatusResult.verdict` is "PASS": run `node scripts/indexing/indexing.mjs mark <url> indexed "<coverageState>"`
- anything else: run `node scripts/indexing/indexing.mjs mark <url> not-indexed "<coverageState>"`, and keep its `inspectionResultLink` for step 2.

If a URL fails to inspect, skip it; it will be retried tomorrow.

## 2. Request indexing on Google (at most 10 URLs)

Run `node scripts/indexing/indexing.mjs to-request 10`. For each URL it prints, in order:

1. In Chrome (create a new tab with the Claude in Chrome tools the first time), navigate to that URL's `inspectionResultLink` from step 1. If you don't have one, inspect the URL again with `inspect_urls` to get it.
2. Wait for the page to load, then use `find` to locate the "REQUEST INDEXING" button and click it.
3. Wait up to 90 seconds for a dialog. Take a screenshot to read it.
   - "Indexing requested": click Dismiss (or press Escape), then run `node scripts/indexing/indexing.mjs requested <url>`.
   - "Quota Exceeded": click Dismiss and stop requesting for today.
   - Anything else (sign-in page, error, button missing): stop requesting, and report what you saw.

Use `browser_batch` to keep the number of round trips low, but keep each batch under 90 seconds of waiting. Close the tabs you opened when you finish.

## 3. Report

Run `node scripts/indexing/indexing.mjs status` (exit code 1 only means the job isn't finished yet) and finish with a short plain-text report: the status line, how many URLs you marked indexed today, how many indexing requests you made, and any problem that needs the owner (for example "Chrome is not signed in to Search Console").
