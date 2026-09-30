import { createPal, type Mood, type Pal, type PalOptions } from 'pagepal';
import { debugPanel } from 'pagepal/debug';
import { installDemoApi } from './demo-api';

declare global {
  interface Window {
    sitePal?: Pal;
  }
}

/**
 * Demo buttons anywhere on the site drive the site pal:
 * `data-pal-react="cheer"`, `data-pal-say="Hi"`, `data-pal-fetch="/demo-api/slow"`, `data-pal-debug`.
 */
let delegated = false;
let removeDebug: (() => void) | null = null;
function delegateDemoButtons(): void {
  if (delegated) return;
  delegated = true;
  // Demo forms exist only to be watched; never actually submit them.
  document.addEventListener('submit', (event) => {
    if ((event.target as Element).matches('form[data-pal-demo]')) event.preventDefault();
  });
  document.addEventListener('click', (event) => {
    const el = (event.target as Element | null)?.closest<HTMLElement>(
      '[data-pal-react], [data-pal-say], [data-pal-fetch], [data-pal-debug]',
    );
    const pal = window.sitePal;
    if (!el || !pal) return;
    if (el.dataset.palReact) pal.react(el.dataset.palReact as Mood, 2500);
    if (el.dataset.palSay) pal.say(el.dataset.palSay);
    if (el.dataset.palFetch) void fetch(el.dataset.palFetch).catch(() => {});
    if (el.hasAttribute('data-pal-debug')) {
      if (removeDebug) {
        removeDebug();
        removeDebug = null;
      } else {
        removeDebug = pal.use(debugPanel());
      }
    }
  });
}

/**
 * The pal that lives on every page of this site. It watches any form marked
 * `data-pal-form` and every request, so demos anywhere on the site just work.
 *
 * Elements with `[data-pal-mood]` show its current mood; `[data-pal-restore]`
 * buttons bring it back after it's dismissed (and are hidden otherwise).
 */
export function startSitePal(options: PalOptions = {}): Pal {
  installDemoApi();
  delegateDemoButtons();
  window.sitePal?.destroy();

  const pal = createPal({
    storageKey: 'pagepal-site',
    watch: '[data-pal-form]',
    requests: true,
    // Reading docs in dark mode shouldn't mean a permanently drowsy mascot.
    // (The playground shows the dark-mode reaction.)
    darkMode: false,
    ...options,
  });
  window.sitePal = pal;

  const showMood = () => {
    document.querySelectorAll<HTMLElement>('[data-pal-mood]').forEach((el) => (el.textContent = pal.mood));
  };
  const showRestore = () => {
    document.querySelectorAll<HTMLElement>('[data-pal-restore]').forEach((el) => (el.hidden = !pal.hidden));
  };

  pal.on('change', showMood);
  pal.on('dismiss', showRestore);
  document.querySelectorAll<HTMLElement>('[data-pal-restore]').forEach((el) =>
    el.addEventListener('click', () => {
      pal.show();
      showRestore();
    }),
  );
  showMood();
  showRestore();
  return pal;
}
