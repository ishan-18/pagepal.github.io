---
title: FAQ
description: Common questions about pagepal.
---

## Won't a mascot annoy my users?

It might, which is why pagepal is built to stay out of the way. It sidesteps chat widgets, cookie banners and focused fields. It can be dragged or dismissed, and remembers that. It respects reduced motion. And it only reacts to things that matter: validation errors, failures and dead ends, not every mouse move. The analytics plugin even measures it: `dismissRate` tells you how many people hide it.

## Does it replace proper error messages?

No. Your page must still explain errors in text, with fields marked `aria-invalid`. The pal is a second, friendlier signal, and the artwork is hidden from screen readers for that reason. See [accessibility](/docs/guides/accessibility/).

## Does it send data anywhere?

Not unless you add the [analytics plugin](/docs/analytics/) *and* configure an `endpoint` or `send`. There is no pagepal server. Dismissal and position are saved in `localStorage` on the user's device only; turn that off with `remember: false`.

## Is the analytics GDPR-compliant?

It's designed to minimize data: no input values, no cross-page identifiers, masked labels, sanitized URLs, consent gating, and it respects Do Not Track and Global Privacy Control. Whether *your* use is compliant depends on your legal basis and your privacy policy. See [privacy](/docs/analytics/privacy/).

## Can I have more than one pal?

Yes, give each a different `storageKey`. But one pal per page is almost always the right number. Several pals all react to the same page events.

## Does it work with my framework?

Yes: the [`<page-pal>` element](/docs/frameworks/web-component/) works everywhere, and [React](/docs/frameworks/react/) and [Vue](/docs/frameworks/vue/) have dedicated components. It's safe to import during [server-side rendering](/docs/frameworks/ssr/).

## It patches `fetch`. Is that safe?

pagepal wraps `fetch` and `XMLHttpRequest.prototype.open/send` and passes every call through unchanged: same arguments, same result, same errors. Unwatching restores the originals unless something wrapped them after pagepal, in which case the wrapper stays but does nothing. It never reads request or response bodies.

## How big is it?

11–20 KB gzipped depending on what you use. See [smaller bundles](/docs/advanced/bundle-size/).

## Can I use my own character?

Yes: draw one in SVG and get every expression for free, or supply images per mood. See [characters](/docs/guides/characters/).

## What's the license?

MIT.
