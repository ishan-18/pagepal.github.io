---
title: Events
description: Every analytics event type pagepal records, and its fields.
---

Every event has four common fields:

| Field | Meaning |
| --- | --- |
| `type` | The event type, below |
| `ts` | Epoch milliseconds |
| `page` | Sanitized path of the page: no query or hash, ID-like segments replaced with `:id` |
| `view` | A random ID for this page view. Not stored anywhere, and not linked to other views |

## Event types

| `type` | Extra fields | Recorded when |
| --- | --- | --- |
| `page_view` | `referrer` (origin only, or `null`), `viewport` (`mobile` / `tablet` / `desktop`) | The page view starts (or when consent is granted) |
| `rage_click` | `element`, `clicks` | 4+ quick clicks in one spot |
| `dead_click` | `element` | A clickable-looking element didn't respond |
| `form_error` | `form`, `field`, `validity`, `source` | A watched form reports an invalid field |
| `form_submit` | `form`, `success`, `durationMs`, `errors` | A watched form is submitted (`durationMs` since the first interaction) |
| `form_abandon` | `form`, `lastField`, `progress`, `durationMs`, `errors` | The user leaves after starting a form without submitting it |
| `request_error` | `method`, `url`, `status`, `durationMs` | A watched request fails |
| `request_slow` | `method`, `url`, `status`, `durationMs` | A watched request took longer than `slowRequestMs` (3 s) |
| `offline` | `durationMs` | The connection comes back, with how long it was gone |
| `pal_poke` | none | The user pokes the mascot |
| `pal_dismiss` | none | The user dismisses the mascot |
| `page_summary` | `durationMs`, `waitMs`, `counts` | The page view ends: time on page, time spent waiting on requests, and a count per event type |
| `js_error` | `message`, `source`, `line` | **Opt-in.** An uncaught error or unhandled rejection, message masked |

Form, field and request events need the matching watchers: `watch` for forms and `requests` for requests. Without them, those events are never recorded.

## Describing elements

`element`, `form`, `field` and `lastField` are short, stable descriptors, for example:

```
button#pay "Pay $##"
input[name="email"]
a[data-testid="upgrade-link"] "Upgrade"
form#checkout
div.plan-card
```

They're built from the id (generated ids like React's `:r3:` are skipped), `name`, a test or tracking attribute (`data-pagepal-name`, `data-testid`, `data-test`, `data-track`, `data-analytics`), or up to two class names. A short, masked label is added for buttons, links and similar elements.

To name an element yourself:

```html
<button data-pagepal-name="checkout-pay">Pay</button>
```

## Example payload

What your endpoint receives:

```json
{
  "events": [
    { "type": "page_view", "ts": 1790812942000, "page": "/checkout", "view": "7f3c…", "referrer": null, "viewport": "desktop" },
    { "type": "form_error", "ts": 1790812951000, "page": "/checkout", "view": "7f3c…", "form": "form#checkout", "field": "input[name=\"zip\"]", "validity": "patternMismatch", "source": "invalid" },
    { "type": "rage_click", "ts": 1790812960000, "page": "/checkout", "view": "7f3c…", "element": "button#pay \"Pay $##\"", "clicks": 5 },
    { "type": "request_error", "ts": 1790812961000, "page": "/checkout", "view": "7f3c…", "method": "POST", "url": "/api/payments", "status": 502, "durationMs": 840 }
  ]
}
```

TypeScript users get the full union type as `UXEvent`, and `UXEventOf<'form_error'>` for a single type.
