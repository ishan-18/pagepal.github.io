---
title: Events
description: Every event the pal emits, and its payload.
---

```ts
const off = pal.on('formError', (detail) => { /* … */ });
off(); // unsubscribe
```

| Event | Listener arguments | Emitted when |
| --- | --- | --- |
| `change` | `(mood, previous)` | The visible mood changes |
| `frustration` | `({ kind, target, clicks, x, y })` | A rage click (`kind: 'rage-click'`) or dead click (`'dead-click'`) |
| `formError` | `({ form, field, source, validity })` | A watched form reports an invalid field |
| `formSubmit` | `({ form, success })` | A watched form is submitted |
| `formProgress` | `({ form, field, progress })` | A field in a watched form changes |
| `request` | `({ kind, method, url, status, ok, duration, failed, aborted })` | A watched request finishes |
| `connection` | `({ online, offlineMs? })` | The connection drops or returns (`offlineMs` on return) |
| `poke` | `()` | The user clicks or taps the pal |
| `dismiss` | `()` | The user dismisses the pal |

## Payload details

**`frustration`**: `target` is the element clicked (for dead clicks, the clickable element that owns the click). `x`, `y` are viewport coordinates.

**`formError`**: `form` is the owning form, or `null`. `source` is `'invalid'` (native validation) or `'aria-invalid'`. `validity` is the first failing `ValidityState` flag, such as `'valueMissing'`, `'typeMismatch'`, `'patternMismatch'`, `'tooShort'`, `'tooLong'`, `'rangeUnderflow'`, `'rangeOverflow'`, `'stepMismatch'`, `'badInput'` or `'customError'`, or `null` when unknown.

**`formProgress`**: `progress` is the share of required fields that are valid (0..1), or `null` when the form has no required fields.

**`request`**: `kind` is `'fetch'` or `'xhr'`. `failed` means it counted as an error (network failure or `isError`). `aborted` covers `AbortController` and requests cut off by leaving the page. `url` is the URL as requested, unsanitized. The analytics plugin sanitizes it before recording.

All events are delivered synchronously, in the order they happen.
