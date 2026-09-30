/** Turns playground choices into copy-pasteable code in four flavors. */

export type Format = 'js' | 'html' | 'react' | 'vue';

export interface Choices {
  character: 'blob' | 'cat' | 'ghost';
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size: number;
  color: string | undefined;
  watch: boolean;
  requests: boolean;
  frustration: boolean;
  deadClicks: boolean;
  password: boolean;
  darkMode: boolean;
  idle: boolean;
  avoid: boolean;
  errors: boolean;
  interactive: boolean;
  analytics: boolean;
  debug: boolean;
}

/** createPal() defaults, so the generated code only shows what you changed. */
const DEFAULTS = {
  character: 'blob',
  position: 'bottom-right',
  size: 72,
  frustration: true,
  deadClicks: true,
  password: true,
  darkMode: true,
  idle: true,
  avoid: true,
  errors: false,
  interactive: true,
  requests: false,
} as const;

type Value = string | number | boolean;

function changedOptions(c: Choices): [string, Value][] {
  const out: [string, Value][] = [];
  if (c.watch) out.push(['watch', 'form#signup']);
  for (const key of Object.keys(DEFAULTS) as (keyof typeof DEFAULTS)[]) {
    if (c[key] !== DEFAULTS[key]) out.push([key, c[key]]);
  }
  if (c.color) out.push(['color', c.color]);
  return out;
}

const js = (v: Value) => (typeof v === 'string' ? `'${v}'` : String(v));
const kebab = (key: string) => key.replace(/[A-Z]/g, (ch) => `-${ch.toLowerCase()}`);

export function buildCode(c: Choices, format: Format): string {
  const options = changedOptions(c);
  const imports: string[] = [];
  const plugins: string[] = [];
  if (c.analytics) {
    imports.push("import { analytics } from 'pagepal/analytics';");
    plugins.push("analytics({ endpoint: '/api/ux' })");
  }
  if (c.debug) {
    imports.push("import { debugPanel } from 'pagepal/debug';");
    plugins.push('debugPanel()');
  }

  if (format === 'html') {
    const attrs = options.map(([k, v]) => (v === true ? kebab(k) : v === false ? `${kebab(k)}="false"` : `${kebab(k)}="${v}"`));
    if (c.analytics) attrs.push('analytics-endpoint="/api/ux"');
    const tag = `<page-pal${attrs.length ? `\n  ${attrs.join('\n  ')}\n` : ''}></page-pal>`;
    const debugNote = c.debug ? `\n<script>\n  // Debug panel while developing:\n  document.querySelector('page-pal').pal.use(PagePal.debugPanel());\n</script>` : '';
    return `<script src="https://unpkg.com/pagepal@1"></script>\n${tag}${debugNote}`;
  }

  if (format === 'react' || format === 'vue') {
    const props = options.map(([k, v]) =>
      v === true ? k : format === 'react' ? `${k}=${typeof v === 'string' ? `"${v}"` : `{${v}}`}` : typeof v === 'string' ? `${k}="${v}"` : `:${k}="${v}"`,
    );
    if (format === 'react') {
      if (plugins.length) props.push(`plugins={[${plugins.join(', ')}]}`);
      const head = ["import { PagePal } from 'pagepal/react';", ...imports].join('\n');
      return `${head}\n\nexport function App() {\n  return (\n    <>\n      <PagePal${props.length ? `\n        ${props.join('\n        ')}\n      ` : ' '}/>\n      {/* your app */}\n    </>\n  );\n}`;
    }
    // Vue: watch and requests are props; everything else goes in :options.
    const vueProps: string[] = [];
    const rest: string[] = [];
    for (const [k, v] of options) {
      if (k === 'watch' || k === 'requests') vueProps.push(v === true ? k : `${k}="${v}"`);
      else rest.push(`${k}: ${js(v)}`);
    }
    if (plugins.length) rest.push(`plugins: [${plugins.join(', ')}]`);
    if (rest.length) vueProps.push(`:options="{ ${rest.join(', ')} }"`);
    const script = ["import { PagePal } from 'pagepal/vue';", ...imports].join('\n');
    return `<script setup>\n${script}\n</script>\n\n<template>\n  <PagePal${vueProps.length ? ` ${vueProps.join(' ')}` : ''} />\n</template>`;
  }

  const lines = options.map(([k, v]) => `  ${k}: ${js(v)},`);
  if (plugins.length) lines.push(`  plugins: [${plugins.join(', ')}],`);
  const head = ["import { createPal } from 'pagepal';", ...imports].join('\n');
  return `${head}\n\n${lines.length ? `createPal({\n${lines.join('\n')}\n});` : 'createPal();'}`;
}
