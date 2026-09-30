---
title: Pal API
description: Methods and properties of the Pal returned by createPal().
---

## Creating

```ts
import { createPal, createPalCore } from 'pagepal';

const pal = createPal(options);        // every watcher available (Pal)
const core = createPalCore(options);   // no watchers; add via plugins (PalCore)
```

`Pal` extends `PalCore` with the `watch*` convenience methods. Both are also exported as classes: `new Pal(options)`.

## Watching

| Method | Returns | |
| --- | --- | --- |
| `watch(target, options?)` | `Unwatch` | Watch a form or container of forms. [Forms](/docs/guides/forms/) |
| `watchRequests(options?)` | `Unwatch` | fetch and XHR. [Requests](/docs/guides/requests/) |
| `watchFetch(options?)` | `Unwatch` | fetch only |
| `watchXHR(options?)` | `Unwatch` | XMLHttpRequest only |
| `use(pluginOrWatcher)` | `Unwatch` | Add a [plugin](/docs/advanced/plugins/) or a watcher from `pagepal/watchers` (available on `PalCore`) |

`Unwatch` is a function: call it to stop watching.

## Reacting

| Method | Returns | |
| --- | --- | --- |
| `react(mood, ms?)` | `this` | Show a mood. Transient moods use their default duration; others hold. `Infinity` holds any mood |
| `react(null)` | `this` | Clear it |
| `signal(key, mood, ms?)` | `this` | Independent keyed signal; holds unless given a duration |
| `clearSignal(key)` | `this` | |
| `say(text, ms = 2500)` | `this` | Speech bubble (text only, never HTML) |
| `lookAt(target, ms?)` | `this` | Turn toward an `Element` or `{ x, y }` viewport point; `null` looks ahead |
| `progress(value)` | `this` | Progress ring, `0..1`, or `null` to hide |

These methods return the pal, so they chain: `pal.react('cheer').say('Saved!')`.

## Visibility

| Member | |
| --- | --- |
| `hide()` | Hide for now (not remembered) |
| `show()` | Show again, clearing a remembered dismissal |
| `dismiss()` | Hide and remember it (what the ✕ does); emits `dismiss` |
| `hidden` | `boolean` |

## State and lifecycle

| Member | |
| --- | --- |
| `mood` | The mood currently shown |
| `element` | The `<pagepal-mascot>` host element, or `null` on the server |
| `on(event, listener)` | Subscribe to an [event](/docs/reference/events/); returns an unsubscribe function |
| `destroy()` | Remove the pal, stop every watcher and plugin, restore patched APIs |

## Other exports

| Export | From | |
| --- | --- | --- |
| `blob`, `cat`, `ghost`, `defineCharacter` | `pagepal`, `pagepal/characters` | [Characters](/docs/guides/characters/) |
| `DEFAULT_PRIORITIES` | `pagepal`, `pagepal/core` | The default mood priorities |
| `isDarkMode(document, window)` | `pagepal` | The built-in dark-mode detector |
| `PagePalElement` | `pagepal/element` | The `<page-pal>` class |
| `debugPanel(options?)` | `pagepal/debug` | [Debug panel](/docs/advanced/debugging/) plugin |

## Types

All types are exported from `pagepal`: `Mood`, `TransientMood`, `PalOptions`, `PalCoreOptions`, `PalEvents`, `PalPlugin`, `PalPluginAPI`, `Watcher`, `Character`, `CharacterDefinition`, `CustomCharacter`, `FormTarget`, `WatchFormOptions`, `WatchRequestsOptions`, `FrustrationDetail`, `FormErrorDetail`, `FormSubmitDetail`, `FormProgressDetail`, `RequestDetail`, `ConnectionDetail`, `SignalInfo`, `Unwatch`, and more.
