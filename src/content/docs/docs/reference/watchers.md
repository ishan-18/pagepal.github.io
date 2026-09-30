---
title: Watchers
description: The built-in watchers exported from pagepal/watchers.
---

```ts
import { forms, requests } from 'pagepal/watchers';

createPalCore({ plugins: [forms('#signup'), requests()] });
pal.use(forms('#late-form'));
```

Each function returns a watcher to pass to `plugins` or `use()`. `createPal()` turns the same watchers on through its options: the last column shows the option.

| Watcher | Reaction | `createPal()` option |
| --- | --- | --- |
| `forms(target, { cheer, wince, progress }?)` | wince + look, warm up, wink, cheer | `watch` |
| `requests({ delay, filter, isError, progress, kinds }?)` | waiting, wince, progress ring | `requests` |
| `scroll({ threshold }?)` | dizzy | `scroll` |
| `network()` | sad, then cheer | `network` |
| `darkMode({ detect }?)` | sleepy | `darkMode` |
| `idle({ timeout }?)` | dozing | `idle` |
| `password()` | shy | `password` |
| `rageClicks({ clicks, within, radius }?)` | concerned | `frustration` |
| `deadClicks({ timeout, ignore }?)` | confused | `deadClicks` |
| `avoidOverlaps({ selectors, focus }?)` | moves aside | `avoid` |
| `copy()` | wink | `copy` |
| `welcomeBack({ after }?)` | cheer | `welcomeBack` |
| `pageErrors()` | wince | `errors` |

`requests({ kinds: ['xhr'] })` limits it to one API: `kinds` accepts `'fetch'` and `'xhr'`.

## Defaults of `createPal()`

On unless turned off: `scroll`, `network`, `darkMode`, `idle`, `password`, `frustration`, `deadClicks`, `avoid`, `copy`, `welcomeBack`.

Off unless turned on: `watch` (needs a target), `requests`, `errors`.
