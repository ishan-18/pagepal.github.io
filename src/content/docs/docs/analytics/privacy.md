---
title: Privacy
description: What pagepal analytics records and never records, consent, privacy signals, sampling and redaction.
---

pagepal analytics is designed to be something you can add without a privacy review turning into a project. It still records behavior on your site, so check it against your own obligations (GDPR, ePrivacy, CCPA) and your privacy policy.

## Never recorded

- **What users type.** Form fields are identified by `name` (or id), never by value.
- **Query strings and hashes.** URLs are reduced to their path.
- **Identifiers that follow a person.** `view` is random per page view, kept in memory only. Nothing is written to cookies or storage, and nothing links two page views.
- **The user agent, IP address or screen size.** Only a coarse `viewport` bucket is recorded. Your server sees the IP when it receives the request; that's up to your server.

## Reduced or masked

- **Labels** (button and link text) have digits replaced with `#` and email addresses with `[email]`, and are cut to 40 characters: `"Pay $49 now"` becomes `"Pay $## now"`.
- **Path segments** that look like IDs become `:id`: `/users/123/orders/9f8e7d6c5b4a` becomes `/users/:id/orders/:id`. That covers numbers, long mixed letter-and-digit tokens, anything with `@`, and very long segments.
- **Referrers** are reduced to their origin.

## Opting parts out

```html
<!-- keep this element's text out of analytics -->
<div data-pagepal-mask> ... </div>
```

```ts
analytics({ captureText: false });              // no labels at all
analytics({ include: ['rage_click', 'dead_click'] });  // record only these types
```

## Error messages are opt-in

Error messages often contain data ("User jane@example.com not found"), so `js_error` is off by default. When you include it, the message is masked and truncated, and the source file loses its query string:

```ts
analytics({ include: ['page_view', 'rage_click', 'dead_click', 'form_error', 'js_error'] });
```

## Do Not Track and Global Privacy Control

If the browser sends **Do Not Track** or **Global Privacy Control**, analytics switches off for that page view. `ux.active` tells you whether it's recording. If your legal basis allows it, you can override:

```ts
analytics({ respectPrivacySignals: false });
```

## Consent

Behind a consent banner, start with consent off. Nothing is recorded or sent until you grant it:

```ts
const ux = analytics({ endpoint: '/api/ux', consent: false });
createPal({ plugins: [ux] });

consentBanner.onAccept(() => ux.consent(true));   // starts recording, beginning with a page_view
consentBanner.onRevoke(() => ux.consent(false));  // stops, and drops anything not yet sent
```

## Sampling

Record a share of page views, decided once per view:

```ts
analytics({ sampleRate: 0.1 });   // 10%
```

## Redaction: the last word

Every event passes through `redact` before it's stored or sent. Return a changed event, or `null` to drop it:

```ts
analytics({
  redact(event) {
    if (event.page.startsWith('/admin')) return null;
    if (event.type === 'form_error' && event.form.includes('medical')) return null;
    return event;
  },
});
```
