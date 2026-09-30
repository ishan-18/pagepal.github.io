/**
 * Site-internal URLs, aware of the deploy base path (e.g. /pagepal/ui when
 * published at ishan-18.github.io/pagepal/ui/). Always use this for root-relative
 * links in components: `url('/docs/')` → `/pagepal/ui/docs/`.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function url(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return `${BASE}${path}`;
}

/** The current path without the base, for "is this nav item active" checks. */
export function withoutBase(pathname: string): string {
  return BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) || '/' : pathname;
}
