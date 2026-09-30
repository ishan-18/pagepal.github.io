---
title: Smaller bundles
description: Build from pagepal/core and include only the watchers you need.
---

`createPal()` includes every watcher so that everything works out of the box. If you only need some, build from the core:

```ts
import { createPalCore } from 'pagepal/core';
import { forms, requests, deadClicks } from 'pagepal/watchers';

createPalCore({ plugins: [forms('#signup'), requests(), deadClicks()] });
```

Watchers you don't import are tree-shaken out. Characters too: `pagepal/core` ships the blob, and `cat` and `ghost` come from `pagepal/characters`:

```ts
import { cat } from 'pagepal/characters';

createPalCore({ character: cat, plugins: [forms('#signup')] });
```

## Available watchers

`forms(target, options?)`, `requests(options?)`, `scroll()`, `network()`, `darkMode()`, `idle()`, `password()`, `rageClicks()`, `deadClicks()`, `avoidOverlaps()`, `copy()`, `welcomeBack()`, `pageErrors()`. See the [watchers reference](/docs/reference/watchers/).

## Sizes

Measured minified and gzipped, and checked by a size budget in pagepal's CI:

| Setup | Size |
| --- | --- |
| `createPalCore` + `forms` + `requests` | 11.1 KB |
| `createPal()` (everything) | 15.0 KB |
| `createPal()` + `analytics` | 18.1 KB |
| Script-tag build (everything, with `<page-pal>`) | 20.1 KB |
| `analytics` alone | 3.5 KB |

Most of the core is the artwork: SVG and CSS for twelve animated moods. The core also includes interaction (drag and dismiss), color resolution, gaze and the plugin system.

## Multiple entry points, one copy

Importing from several entry points (`pagepal`, `pagepal/analytics`, `pagepal/react`, …) never duplicates code. They share chunks, and the React and Vue adapters import the core as a peer.
