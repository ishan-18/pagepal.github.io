/**
 * A pretend backend for the demos, since this is a static site. Requests to
 * /demo-api/* go through the real `fetch` API (so pagepal's request watcher
 * sees them) but are answered here:
 *
 *   /demo-api/slow      200 after 2s
 *   /demo-api/rates     200 after 3.5s (counts as "slow" for analytics)
 *   /demo-api/fail      502 after 0.8s
 *   anything else       200 after 0.6s
 *
 * Must be installed before pagepal patches fetch.
 */
const DELAYS: Record<string, number> = { slow: 2000, rates: 3500, fail: 800 };

let installed = false;

export function installDemoApi(): void {
  if (installed || typeof window === 'undefined') return;
  installed = true;
  const realFetch = window.fetch.bind(window);

  window.fetch = (input, init) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    const path = new URL(url, location.href).pathname;
    if (!path.startsWith('/demo-api/')) return realFetch(input, init);

    const name = path.slice('/demo-api/'.length);
    const status = name === 'fail' ? 502 : 200;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(
        () => resolve(new Response(JSON.stringify({ ok: status === 200 }), { status, headers: { 'content-type': 'application/json' } })),
        DELAYS[name] ?? 600,
      );
      init?.signal?.addEventListener('abort', () => {
        clearTimeout(timer);
        reject(new DOMException('Aborted', 'AbortError'));
      });
    });
  };
}
