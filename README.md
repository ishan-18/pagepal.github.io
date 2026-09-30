# pagepal website

The website and documentation for [pagepal](../pagepal): a landing page, 31 documentation pages, an options playground and a live analytics demo. Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

The site uses pagepal itself on every page. Every demo drives the real library.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
```

`pagepal` is linked from `../pagepal` (`"pagepal": "file:../pagepal"`), so build the package first (`npm run build` in `../pagepal`). Once pagepal is published to npm, change the dependency to `"pagepal": "^1.0.0"`.

## Build and check

```bash
npm run build        # static site in dist/, including the Pagefind search index
npm run check        # type-check .astro and TypeScript files
npm run check:links  # every internal link and #anchor in dist/ resolves
npm run preview      # serve dist/
```

Set `SITE_URL` when building for production so canonical URLs and the sitemap are absolute. To serve the site from a subfolder, set `BASE_PATH` for both the build and the link check (e.g. `BASE_PATH=/pagepal/ui`). Links in components go through `url()` in `src/lib/url.ts`; links written in Markdown get the prefix automatically (`src/lib/rehype-base-links.mjs`).

## Structure

| Path | What |
| --- | --- |
| `src/pages/index.astro` | Landing page |
| `src/pages/playground.astro` | Options playground (code generation in `src/scripts/playground-code.ts`) |
| `src/pages/analytics.astro` | Live analytics demo on a deliberately broken checkout |
| `src/content/docs/docs/` | Documentation (Markdown/MDX), served under `/docs/` |
| `src/content/docs/docs/changelog.md` | **Generated** from `../pagepal/CHANGELOG.md` by `scripts/sync-changelog.mjs` before `dev`/`build` |
| `src/scripts/site-pal.ts` | The pal on every page; `data-pal-*` attributes drive it from demos |
| `src/scripts/demo-api.ts` | A pretend backend (`/demo-api/*`) for the request demos, since the site is static |
| `src/components/starlight/` | Starlight overrides: header links, and the pal in the docs |
| `src/data/` | Mood list and the clearly-labelled sample analytics data |
| `astro.config.mjs` | Starlight config and the docs sidebar |

### Demo attributes

Any page, including docs pages, can drive the site pal:

```html
<button data-pal-react="cheer">Cheer</button>
<button data-pal-say="Hello">Say hi</button>
<button data-pal-fetch="/demo-api/slow">Slow request</button>
<button data-pal-debug>Toggle debug panel</button>
<form data-pal-form data-pal-demo>…</form>   <!-- watched, never submitted -->
<code data-pal-mood></code>                   <!-- shows the current mood -->
<span data-display-pal="wink" data-character="cat" data-size="96"></span>  <!-- illustration -->
```

## Deploy

The site is published at **https://ishan-18.github.io/pagepal/ui/** by the **"Docs site"** workflow in the package repository (`ishan-18/pagepal`, `.github/workflows/pages.yml`). That workflow checks out both repositories side by side, builds the package, builds this site with `BASE_PATH=/pagepal/ui`, checks its links, and publishes:

| URL | What |
| --- | --- |
| `/pagepal/` | Redirects to `/pagepal/ui/` |
| `/pagepal/ui/` | This website |
| `/pagepal/demo/` | The package's own demo pages |

This repository doesn't publish itself. Its `.github/workflows/deploy.yml` asks `ishan-18/pagepal` to rebuild after every push, using a `PAGEPAL_DEPLOY_TOKEN` secret: a fine-grained personal access token for `ishan-18/pagepal` with **Contents: Read and write**. Without that secret, run "Docs site" in `ishan-18/pagepal` by hand after pushing here.

`dist/` is a plain static site, so any static host (Netlify, Vercel, Cloudflare Pages) also works; the build needs `../pagepal` to exist (or the npm dependency, once published).