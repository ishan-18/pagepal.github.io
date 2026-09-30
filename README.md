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

Set `SITE_URL` when building for production (e.g. `SITE_URL=https://pagepal.dev npm run build`) so canonical URLs and the sitemap are absolute.

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

`dist/` is a static site: GitHub Pages, Netlify, Vercel, Cloudflare Pages and any static host work. The build needs `../pagepal` to exist (or the npm dependency, once published).

Set `githubUrl` in `src/site.ts` when the repository is public, and GitHub links appear in the header and footer.
