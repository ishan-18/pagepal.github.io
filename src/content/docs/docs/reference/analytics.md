---
title: Analytics API
description: analytics(), its options and controls, summarize(), adapters and helpers.
---

```ts
import { analytics, summarize, toGA4, toPostHog, toSegment, toPlausible } from 'pagepal/analytics';
```

## `analytics(options?)`

Returns a plugin: pass it to `plugins` or `use()`. Use one instance per pal.

| Option | Type | Default | |
| --- | --- | --- | --- |
| `endpoint` | `string` | none | POST batches here via `sendBeacon` |
| `send` | `Sink \| Sink[]` | none | Your own delivery, or adapters |
| `consent` | `boolean` | `true` | Start without consent (`false`) and grant it later |
| `respectPrivacySignals` | `boolean` | `true` | Off when Do Not Track or GPC is set |
| `sampleRate` | `number` | `1` | Share of page views to record |
| `include` | `UXEventType[]` | all except `js_error` | Event types to record |
| `captureText` | `boolean` | `true` | Short masked labels for clicked elements |
| `slowRequestMs` | `number` | `3000` | Threshold for `request_slow` |
| `batchSize` | `number` | `20` | Send when this many are queued |
| `flushInterval` | `number` | `5000` | Send at least this often (ms) |
| `redact` | `(event) => event \| null \| void` | none | Scrub or drop events |

`Sink` is `(events: UXEvent[]) => void | Promise<unknown>`.

### Controls

| Member | |
| --- | --- |
| `consent(granted)` | Grant or revoke. Revoking drops unsent events |
| `flush()` | Send queued events now |
| `events()` | Events recorded this page view (last 500) |
| `summary()` | `summarize(events())` |
| `active` | Whether this view is recorded (installed, sampled in, no privacy signal) |

## `summarize(events)`

Pure function: `UXEvent[]` → `UXSummary`. See [dashboards](/docs/analytics/dashboards/).

## Adapters

| Function | Argument |
| --- | --- |
| `toGA4(gtag)` | `gtag` function |
| `toPostHog(posthog)` | object with `capture(name, props)` |
| `toSegment(analytics)` | object with `track(name, props)` |
| `toPlausible(plausible)` | `plausible` function |

Each returns a `Sink`. Events are named `pagepal_<type>` with flat properties. `page_view` is not forwarded.

## Helpers

| Function | |
| --- | --- |
| `describeElement(el, captureText = true)` | The privacy-safe descriptor used for `element`/`field`/`form` |
| `sanitizePath(path)` | `/users/123` → `/users/:id` |
| `sanitizeUrl(url, base)` | Path only for same-origin; origin + path otherwise; no query or hash |
| `maskText(text, max = 40)` | Digits → `#`, emails → `[email]`, collapsed and truncated |

## Types

`UXEvent`, `UXEventOf<T>`, `UXEventType`, `UXSummary`, `AnalyticsOptions`, `Sink`, `Analytics`.
