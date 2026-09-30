---
title: Accessibility
description: How pagepal behaves with screen readers, keyboards and reduced motion, and what it expects from your page.
---

## The mascot echoes, it doesn't inform

pagepal is a second channel for feedback your page should already give. When a form field is invalid, your page must still say so in text, with the field marked `aria-invalid`. The pal's wince is extra.

That's why the **artwork is hidden from assistive technology** (`aria-hidden`). A screen reader announcing "the mascot is concerned" would be noise.

## Keyboard

The dismiss button is a real `<button>`, in the tab order, labelled "Hide mascot":

- It usually comes last in the tab order: the pal is appended to `<body>` when it's created.
- It becomes visible when focused, with a clear focus ring.
- Enter or Space dismisses the pal.

Translate the label:

```ts
createPal({ labels: { dismiss: 'Masquer la mascotte' } });
```

If you'd rather keep the pal out of the tab order entirely, use `keyboard: false`. The whole pal is then `aria-hidden`. Keyboard users are never *blocked* by it: it doesn't trap focus or cover focused fields (see [staying out of the way](/docs/guides/staying-out-of-the-way/)).

## Reduced motion

With `prefers-reduced-motion: reduce`, every animation and transition is off. Expressions still change, so the meaning survives without the motion.

## Pointer

With `interactive: false` the pal never receives pointer events, so it can never cover a click target. With interaction on (the default), it occupies its small corner. It slides away from focused fields and from other pinned elements, and users can drag it or dismiss it.

## Print

The pal is hidden when printing.

## Color

Moods are shown by shape (eyes, mouth, effects), never by color alone. A custom `color` changes the body only; the face keeps its contrast.
