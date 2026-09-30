import type { UXEvent } from 'pagepal/analytics';

/**
 * A small, made-up week of checkout traffic, used to show what `summarize()`
 * produces. Clearly sample data: it is labelled as such wherever it appears.
 */
const views: UXEvent[][] = [];
let ts = Date.UTC(2026, 8, 21, 9);
const next = () => (ts += 37_000);

for (let i = 0; i < 40; i++) {
  const view = `v${i}`;
  const page = i % 4 === 0 ? '/pricing' : '/checkout';
  const base = { view, page };
  const events: UXEvent[] = [{ ...base, ts: next(), type: 'page_view', referrer: null, viewport: i % 3 ? 'desktop' : 'mobile' }];

  if (page === '/checkout') {
    if (i % 3 === 0) events.push({ ...base, ts: next(), type: 'dead_click', element: 'button#apply-coupon "Apply"' });
    if (i % 5 === 0) events.push({ ...base, ts: next(), type: 'rage_click', element: 'button#pay "Pay $##"', clicks: 5 });
    if (i % 2 === 0)
      events.push({ ...base, ts: next(), type: 'form_error', form: 'form#checkout', field: 'input[name="zip"]', validity: 'patternMismatch', source: 'invalid' });
    if (i % 7 === 0)
      events.push({ ...base, ts: next(), type: 'form_error', form: 'form#checkout', field: 'input[name="email"]', validity: 'typeMismatch', source: 'invalid' });
    if (i % 6 === 0) events.push({ ...base, ts: next(), type: 'request_error', method: 'POST', url: '/api/payments', status: 502, durationMs: 840 });
    if (i % 4 === 1) events.push({ ...base, ts: next(), type: 'request_slow', method: 'GET', url: '/api/shipping/rates', status: 200, durationMs: 4200 });
    if (i % 3 === 1)
      events.push({ ...base, ts: next(), type: 'form_abandon', form: 'form#checkout', lastField: 'input[name="zip"]', progress: 0.6, durationMs: 48_000, errors: 2 });
    else events.push({ ...base, ts: next(), type: 'form_submit', form: 'form#checkout', success: true, durationMs: 61_000, errors: i % 2 });
  } else if (i % 8 === 0) {
    events.push({ ...base, ts: next(), type: 'dead_click', element: 'div.plan-card "Enterprise"' });
  }
  if (i % 10 === 3) events.push({ ...base, ts: next(), type: 'pal_dismiss' });
  events.push({ ...base, ts: next(), type: 'page_summary', durationMs: 90_000, waitMs: page === '/checkout' ? 2400 : 300, counts: {} });
  views.push(events);
}

export const SAMPLE_EVENTS: UXEvent[] = views.flat();
