// Copies the package's CHANGELOG.md into the docs, so the site never drifts from it.
// Runs before `dev` and `build`. Source: ../pagepal/CHANGELOG.md (or PAGEPAL_DIR).
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const source = join(process.env.PAGEPAL_DIR ?? join(root, '..', 'pagepal'), 'CHANGELOG.md');
const target = join(root, 'src', 'content', 'docs', 'docs', 'changelog.md');

if (!existsSync(source)) {
  console.warn(`sync-changelog: ${source} not found; keeping the existing changelog page.`);
  process.exit(0);
}

// Drop the "# Changelog" heading: Starlight renders the page title itself.
const body = readFileSync(source, 'utf8').replace(/^# Changelog\s*\n/, '');
const page = `---
title: Changelog
description: Every pagepal release and what changed.
---

<!-- Generated from the package's CHANGELOG.md by scripts/sync-changelog.mjs. Edit it there. -->

${body}`;

writeFileSync(target, page);
console.log('sync-changelog: updated docs/changelog.md');
