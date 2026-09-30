---
title: Options
description: Every option accepted by createPal() and createPalCore().
---

```ts
import { createPal } from 'pagepal';

const pal = createPal({ /* options */ });
```

All options are optional. Every watcher option also accepts `false` to turn it off, and `true` for its defaults.

## Appearance

| Option | Type | Default | |
| --- | --- | --- | --- |
| `character` | `'blob' \| 'cat' \| 'ghost' \| CharacterDefinition \| { images }` | `'blob'` | [Characters](/docs/guides/characters/) |
| `color` | CSS color \| `'auto'` | character's color | Body color; see [color](/docs/guides/characters/#color) |
| `size` | `number` | `72` | px |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left' \| 'inline'` | `'bottom-right'` | |
| `offset` | `number` | `20` | px from the edges |
| `zIndex` | `number` | `2147483000` | |
| `container` | `HTMLElement` | `document.body` | Where to mount it; required in practice for `'inline'` |

## Interaction and storage

| Option | Type | Default | |
| --- | --- | --- | --- |
| `interactive` | `boolean` | `true` | Poke, drag and dismiss. `false` makes it click-through |
| `keyboard` | `boolean` | `true` | Dismiss button in the tab order |
| `labels` | `{ dismiss?: string }` | `{ dismiss: 'Hide mascot' }` | Accessible labels |
| `remember` | `boolean` | `true` | Remember dismissal and position in `localStorage` |
| `storageKey` | `string` | `'pagepal'` | `localStorage` key |
| `gaze` | `boolean \| { duration?: number }` | `{ duration: 2500 }` | Look at the field with a validation error |

## What to watch

| Option | Type | Default | |
| --- | --- | --- | --- |
| `watch` | selector \| element \| array | none | [Forms](/docs/guides/forms/) to watch |
| `requests` | `boolean \| WatchRequestsOptions` | `false` | [fetch and XHR](/docs/guides/requests/) |
| `scroll` | `boolean \| { threshold?: number }` | `{ threshold: 2 }` | px/ms averaged over 300 ms |
| `network` | `boolean` | `true` | Offline → sad |
| `darkMode` | `boolean \| { detect?: () => boolean }` | `true` | Dark mode → sleepy |
| `idle` | `boolean \| { timeout?: number }` | `{ timeout: 30000 }` | |
| `password` | `boolean` | `true` | Password field → shy |
| `frustration` | `boolean \| { clicks?, within?, radius? }` | `{ clicks: 4, within: 1000, radius: 30 }` | [Rage clicks](/docs/guides/frustration/) |
| `deadClicks` | `boolean \| { timeout?, ignore? }` | `{ timeout: 1000 }` | [Dead clicks](/docs/guides/frustration/) |
| `avoid` | `boolean \| { selectors?, focus? }` | `{ focus: true }` | [Overlap avoidance](/docs/guides/staying-out-of-the-way/) |
| `copy` | `boolean` | `true` | Copy → wink |
| `welcomeBack` | `boolean \| { after?: number }` | `{ after: 30000 }` | Back after a while → cheer |
| `errors` | `boolean` | `false` | Uncaught errors → wince |

## Extending and tuning

| Option | Type | Default | |
| --- | --- | --- | --- |
| `plugins` | `(PalPlugin \| Watcher)[]` | `[]` | [Plugins](/docs/advanced/plugins/), watchers, `analytics()`, `debugPanel()` |
| `durations` | `Partial<Record<TransientMood, number>>` | cheer 1800, wince 1200, dizzy 1200, wink 900, concerned 1800, confused 1600 | ms |
| `priorities` | `Partial<Record<Mood, number>>` | [see moods](/docs/guides/moods/) | Higher wins |

## `createPalCore()`

`createPalCore()` from `pagepal/core` accepts the **appearance, interaction, storage and extending** options above. It has no watcher options: add watchers through `plugins`. Its `character` accepts a definition or images, not a name. See [smaller bundles](/docs/advanced/bundle-size/).

## Request options

```ts
interface WatchRequestsOptions {
  delay?: number;                                              // 150
  filter?: (input: RequestInfo | URL, init?: RequestInit) => boolean;
  isError?: (response: { status: number; ok: boolean; url: string }) => boolean;  // status >= 500
  progress?: number | false;                                   // 100_000 bytes
}
```

## Form options

Per form, as the second argument to `pal.watch()`:

```ts
interface WatchFormOptions {
  cheer?: boolean;     // true
  wince?: boolean;     // true
  progress?: boolean;  // true
}
```
