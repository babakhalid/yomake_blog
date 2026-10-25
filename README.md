# Youmake Blog

blog.youmake.dev: a statically generated Next.js (App Router) blog.

- Articles: `src/articles/<slug>.md` (frontmatter: title, description, date, updated, author, tags, topic, image, published)
- Topics and author: `src/data/site.json`
- `npm run dev` / `npm run build` (interlinks articles, writes `src/generated/articles-index.json`, then `next build`)

Every page is prerendered at build. SEO lives in `src/utils/seo.ts` (metadata + JSON-LD); `src/app/sitemap.ts`,
`robots.ts`, `feed.xml` and `og/[image]` (1200×630 social cards) are generated from the same article index.
