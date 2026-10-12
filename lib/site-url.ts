const PRODUCTION_URL = 'https://godnik.in';

// Canonical origin for metadata, sitemap, social images and the curl card.
// Order: explicit override → the custom domain in production builds → local dev.
// (Vercel's own *.vercel.app domain is deliberately never used as the canonical host.)
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, '');

  if (process.env.NODE_ENV === 'production') return PRODUCTION_URL;
  return 'http://localhost:3000';
}

export const SITE_URL = resolveSiteUrl();
export const SITE_HOST = new URL(SITE_URL).host;
