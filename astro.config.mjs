// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// Docs live under /docs/ (src/content/docs/docs/*). The landing page, playground
// and analytics demo are regular Astro pages in src/pages/.
export default defineConfig({
  // Set SITE_URL when deploying so canonical URLs and the sitemap are absolute.
  site: process.env.SITE_URL,
  integrations: [
    starlight({
      title: 'pagepal',
      description: 'A mascot that reacts to your page, plus first-party UX analytics.',
      logo: { src: './src/assets/logo.svg', alt: 'pagepal' },
      favicon: '/favicon.svg',
      customCss: ['@fontsource-variable/nunito', './src/styles/tokens.css', './src/styles/starlight.css'],
      components: {
        // Adds site navigation next to the search box, and the site-wide pal.
        SocialIcons: './src/components/starlight/HeaderLinks.astro',
        Footer: './src/components/starlight/Footer.astro',
      },
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'Introduction', slug: 'docs' },
            { label: 'Installation', slug: 'docs/installation' },
            { label: 'Quick start', slug: 'docs/quick-start' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Moods & priorities', slug: 'docs/guides/moods' },
            { label: 'Forms', slug: 'docs/guides/forms' },
            { label: 'Requests', slug: 'docs/guides/requests' },
            { label: 'Rage & dead clicks', slug: 'docs/guides/frustration' },
            { label: 'Page state', slug: 'docs/guides/page-state' },
            { label: 'Staying out of the way', slug: 'docs/guides/staying-out-of-the-way' },
            { label: 'Characters & color', slug: 'docs/guides/characters' },
            { label: 'Accessibility', slug: 'docs/guides/accessibility' },
          ],
        },
        {
          label: 'Analytics',
          items: [
            { label: 'Overview', slug: 'docs/analytics' },
            { label: 'Events', slug: 'docs/analytics/events' },
            { label: 'Privacy', slug: 'docs/analytics/privacy' },
            { label: 'Delivery & adapters', slug: 'docs/analytics/delivery' },
            { label: 'Receiving events', slug: 'docs/analytics/receiving' },
            { label: 'Dashboards', slug: 'docs/analytics/dashboards' },
          ],
        },
        {
          label: 'Frameworks',
          items: [
            { label: 'Script tag & web component', slug: 'docs/frameworks/web-component' },
            { label: 'React', slug: 'docs/frameworks/react' },
            { label: 'Vue', slug: 'docs/frameworks/vue' },
            { label: 'Server-side rendering', slug: 'docs/frameworks/ssr' },
          ],
        },
        {
          label: 'Advanced',
          items: [
            { label: 'Plugins & signals', slug: 'docs/advanced/plugins' },
            { label: 'Smaller bundles', slug: 'docs/advanced/bundle-size' },
            { label: 'Debugging', slug: 'docs/advanced/debugging' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Options', slug: 'docs/reference/options' },
            { label: 'Pal API', slug: 'docs/reference/api' },
            { label: 'Events', slug: 'docs/reference/events' },
            { label: 'Watchers', slug: 'docs/reference/watchers' },
            { label: 'Analytics API', slug: 'docs/reference/analytics' },
          ],
        },
        {
          label: 'More',
          items: [
            { label: 'FAQ', slug: 'docs/faq' },
            { label: 'Changelog', slug: 'docs/changelog' },
            { label: 'Playground', link: '/playground/' },
            { label: 'Analytics demo', link: '/analytics/' },
          ],
        },
      ],
    }),
  ],
  vite: {
    // `pagepal` is linked from ../pagepal until it is published to npm.
    server: { fs: { allow: ['..'] } },
  },
});
