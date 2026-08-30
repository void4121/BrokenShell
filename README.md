# brokenshell.net — Jekyll site

This is now a Jekyll site (converted from a static HTML export). GitHub Pages
builds Jekyll sites automatically — no GitHub Action needed, just push.

## Writing a new post

1. Add a file to `_posts/` named `YYYY-MM-DD-your-slug.md` (the date is
   required in the filename; the slug becomes the URL, e.g.
   `2026-09-01-new-project.md` → `brokenshell.net/new-project/`).
2. Add front matter at the top, then write the body in plain Markdown below it:

   ```markdown
   ---
   title: New Project
   tags: [projects]
   image: /content/images/2026/09/cover.png   # optional
   excerpt: "One or two sentence summary for the homepage card and SEO."
   ---
   Your post content here, written in normal Markdown — headings, lists,
   **bold**, [links](https://example.com), and fenced code blocks:

   ```bash
   echo "like this"
   ```
   ```
3. Drop any images for the post under `content/images/`, and reference them
   with a path starting `/content/images/...`.
4. Commit and push to `main`. GitHub Pages rebuilds automatically within a
   minute or two — no local build step required.
5. The post shows up on the homepage and on `/tag/projects/` automatically
   (as long as `projects` is in its `tags:`), and in the RSS feed at
   `/feed.xml`.

## Editing a static page (like About)

Static pages are plain `.md` files in the repo root (e.g. `about.md`). Edit
the Markdown body directly and push.

## Local preview (optional but recommended)

If you have Ruby installed:

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`. This uses the same `github-pages` gem
GitHub itself builds with, so what you see locally should match what
deploys.

## What changed from the plain-HTML version

- Every page is now generated from a shared layout (`_layouts/default.html`,
  `_layouts/post.html`, `_layouts/page.html`, `_layouts/home.html`) instead
  of duplicated HTML in every file — the header, footer, and `<head>`
  boilerplate live in one place.
- SEO/social meta tags (title, description, Open Graph, Twitter Card,
  JSON-LD) are generated automatically per-page by the `jekyll-seo-tag`
  plugin from each post/page's front matter, instead of being hand-written
  in every file.
- RSS is generated automatically by `jekyll-feed` at `/feed.xml` (previously
  a hand-maintained `rss/index.html`). Update any feed subscriptions to the
  new URL.
- `.nojekyll` was removed since we now want GitHub to run Jekyll.
- The four existing posts (`ELK`, `Offensive Security Journey`,
  `Home Labbing`, `Defensive Security Journey`) and the `About` page were
  converted from raw HTML into Markdown source files under `_posts/` and
  `about.md`, with URLs preserved exactly.
- The two Ghost "toggle card" collapsible sections in the Home Labbing post
  were kept as raw HTML embedded in the Markdown file (Markdown allows
  this), since they rely on the existing `public/cards.min.js`/`cards.min.css`
  for their open/close behavior and styling.

## Known gaps carried over from the original export

- No `favicon.ico`/`favicon.png` file exists yet — pages reference one but
  it 404s. Add one at the repo root and it'll pick up automatically once
  referenced in `_layouts/default.html`.
- The "Defensive Security Journey" post has no body yet (it was empty in
  the original site too) — there's a placeholder comment marking where to
  add it.
