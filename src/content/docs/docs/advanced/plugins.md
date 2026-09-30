---
title: Plugins & signals
description: Extend pagepal with your own watchers, signals and progress.
---

## Signals

A signal is a mood under a key. The pal shows the highest-priority active signal (see [moods & priorities](/docs/guides/moods/)). Your own code can raise signals too:

```ts
pal.signal('upload', 'waiting');          // holds until cleared
pal.signal('saved', 'cheer', 1500);       // expires after 1.5s
pal.clearSignal('upload');
```

Unlike `react()`, which has a single slot, every key is independent. An upload and a sync can both be "waiting", and clearing one leaves the other.

## Plugins

A plugin is a function that receives a small API and optionally returns a cleanup function. Use it to package a custom watcher:

```ts
import type { PalPlugin } from 'pagepal';

export const uploads: PalPlugin = ({ signal, clear, progress, say, document }) => {
  const onProgress = (e: CustomEvent<{ fraction: number }>) => {
    signal('upload', 'waiting');
    progress(e.detail.fraction);
  };
  const onDone = () => {
    clear('upload');
    progress(null);
    signal('done', 'cheer', 1500);
    say('Uploaded!');
  };
  document.addEventListener('upload:progress', onProgress as EventListener);
  document.addEventListener('upload:done', onDone);
  return () => {
    document.removeEventListener('upload:progress', onProgress as EventListener);
    document.removeEventListener('upload:done', onDone);
  };
};

const remove = pal.use(uploads);   // or createPal({ plugins: [uploads] })
remove();                          // runs cleanup, clears its signals and progress
```

### The plugin API

| Member | Meaning |
| --- | --- |
| `signal(key, mood, ms?)` / `clear(key)` | Raise or clear a signal. Keys are **namespaced per plugin**, so plugins can't clobber each other or the built-in watchers |
| `progress(value \| null)` | Show or hide the progress ring (0..1) |
| `say(text, ms?)` | Show a speech bubble |
| `lookAt(elementOrPoint \| null, ms?)` | Turn toward something |
| `on(event, listener)` | Subscribe to [events](/docs/reference/events/); removed automatically with the plugin |
| `signals()` | Every active signal from every source, for debugging tools |
| `mood` | The current mood |
| `element` | The pal's host element |
| `window`, `document`, `durations` | The environment and the configured durations |

When the plugin is removed, or the pal is destroyed, pagepal runs your cleanup, removes your listeners, and clears your signals and progress.

## Built-in watchers are plugins too

`use()` and the `plugins` option also accept pagepal's own watchers from `pagepal/watchers`, which is how [smaller bundles](/docs/advanced/bundle-size/) are built:

```ts
import { forms, requests } from 'pagepal/watchers';

pal.use(forms('#late-form'));
```

The [analytics plugin](/docs/analytics/) and the [debug panel](/docs/advanced/debugging/) are ordinary plugins built on this same API.
