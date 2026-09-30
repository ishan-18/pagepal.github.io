// Checks that every internal link and in-page anchor in the built site resolves.
// Usage: npm run build && npm run check:links
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(dirname(fileURLToPath(import.meta.url))), 'dist');
if (!existsSync(dist)) {
  console.error('No dist/ folder. Run `npm run build` first.');
  process.exit(1);
}

const pages = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) pages.push(path);
  }
};
walk(dist);

const idsCache = new Map();
const idsOf = (file) => {
  if (!idsCache.has(file)) {
    const html = readFileSync(file, 'utf8');
    idsCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idsCache.get(file);
};

const resolvePage = (pathname) => {
  const clean = decodeURIComponent(pathname).replace(/^\//, '');
  const candidates = [join(dist, clean), join(dist, clean, 'index.html'), join(dist, `${clean}.html`)];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile());
};

let broken = 0;
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const pagePath = `/${relative(dist, page).replace(/\\/g, '/').replace(/index\.html$/, '')}`;
  for (const [, href] of html.matchAll(/\shref="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:|javascript:|\/\/)/.test(href)) continue;
    const url = new URL(href, `http://site${pagePath}`);
    const target = resolvePage(url.pathname);
    if (!target) {
      console.log(`BROKEN  ${pagePath} -> ${href}`);
      broken++;
      continue;
    }
    if (url.hash && target.endsWith('.html')) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (id && !idsOf(target).has(id)) {
        console.log(`ANCHOR  ${pagePath} -> ${href}`);
        broken++;
      }
    }
  }
}

console.log(`${pages.length} pages checked, ${broken} broken link(s).`);
process.exit(broken ? 1 : 0);
