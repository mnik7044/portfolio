// Canonical origin for metadata, sitemap and the curl card.
// Order: explicit override → Vercel production domain → local dev.
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, '');

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`;

  if (process.env.NODE_ENV === 'production') {
    console.warn(
      '[site-url] No NEXT_PUBLIC_SITE_URL or VERCEL_PROJECT_PRODUCTION_URL set; canonical URLs, the OG image, the sitemap and the curl card will point at localhost.',
    );
  }
  return 'http://localhost:3000';
}

export const SITE_URL = resolveSiteUrl();
export const SITE_HOST = new URL(SITE_URL).host;
