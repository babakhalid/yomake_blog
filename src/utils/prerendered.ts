// Holds the article body HTML that scripts/prerender-meta.js put in #root for
// crawlers, keyed by its path, so ArticlePage can show it while the markdown loads.
let prerendered: { path: string; html: string } | undefined;

export function rememberPrerenderedBody(root: HTMLElement) {
  const body = root.querySelector<HTMLElement>('.prerender-body[data-path]');
  if (body) prerendered = { path: body.dataset.path!, html: body.innerHTML };
}

export function prerenderedBodyFor(path: string): string | undefined {
  return prerendered?.path === path ? prerendered.html : undefined;
}
