import type { NextConfig } from 'next';

// Terminal HTTP clients hitting the home page get the plain-text card instead of HTML:
//   curl -sL <site>
// On Vercel this rewrite runs in the edge router before the cache, so the HTML and the card are
// cached as separate routes. (Next overwrites `Vary` on page responses, so don't rely on it for /.)
const TERMINAL_CLIENTS = '(?:curl|Wget|HTTPie|httpie-go|xh)/.*';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          has: [{ type: 'header', key: 'user-agent', value: TERMINAL_CLIENTS }],
          destination: '/card',
        },
      ],
      afterFiles: [
        { source: '/favicon.ico', destination: '/icon' },
        // Plain-text project pages, like arupb.com's ".txt" links.
        { source: '/projects/:slug.txt', destination: '/projects/:slug/txt' },
      ],
      fallback: [],
    };
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
