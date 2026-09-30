import { cat, ghost } from 'pagepal/characters';
import { blob, createPalCore, type Mood } from 'pagepal/core';

const CHARACTERS = { blob, cat, ghost };

/**
 * Illustration-only pals: no watchers, not interactive, just a character
 * showing a mood. Markup: `<span data-display-pal="cheer" data-character="cat" data-size="96">`.
 */
export function mountDisplayPals(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-display-pal]:not([data-mounted])').forEach((el) => {
    el.dataset.mounted = '';
    const character = CHARACTERS[(el.dataset.character as keyof typeof CHARACTERS) ?? 'blob'] ?? blob;
    const pal = createPalCore({
      container: el,
      position: 'inline',
      size: Number(el.dataset.size) || 88,
      character,
      interactive: false,
      remember: false,
      gaze: false,
    });
    pal.react(el.dataset.displayPal as Mood, Infinity);
    (el as HTMLElement & { pal?: typeof pal }).pal = pal;
  });
}
