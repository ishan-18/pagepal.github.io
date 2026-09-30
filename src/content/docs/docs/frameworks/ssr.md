---
title: Server-side rendering
description: pagepal is safe to import and call on the server; it simply does nothing there.
---

Every pagepal entry point can be imported in Node, and `createPal()` can be called there. Without a `document`, the pal is **inert**:

- nothing renders, no listeners are added, and nothing is patched;
- every method still works: `react()`, `on()`, `use()` and `destroy()` don't throw;
- `pal.element` is `null`, and `pal.mood` still tracks moods you set yourself.

So code like this runs unchanged on the server and the client:

```ts
import { createPal } from 'pagepal';

export const pal = createPal({ requests: true });
```

That said, a module-level pal on the server is shared by every request. In SSR frameworks, create the pal on the client instead: in an effect (the [React](/docs/frameworks/react/) and [Vue](/docs/frameworks/vue/) components do this for you), a client-only plugin, or a `<script>` that runs in the browser.

## Analytics on the server

`analytics()` installs nothing without a window, but **`summarize()` is a pure function** and is meant to run on the server, over the events you stored:

```ts
import { summarize } from 'pagepal/analytics';

const report = summarize(await loadEvents());
```
