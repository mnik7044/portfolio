# nikhil-mishra-portfolio

Personal site of Nikhil Mishra — backend engineer. Next.js 16 (App Router), React 19, hand-written CSS, no UI framework.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck
```

## Editing content

Everything lives in [`content/site.ts`](content/site.ts): profile, hero, stats, experience, projects and writing. Strings support `**strong**` and `` `code` ``. The home page, every project page, the terminal card and `llms.txt` all read from this one file.

Each entry in `projects` becomes a row on the home page (grouped by `group`, in file order — hardest first) and its own page at `/projects/<slug>` with a plain-text twin at `/projects/<slug>.txt`. Pipeline diagrams are plain data:

```ts
steps: ['query', '*router|SQL · RAG', ['SQL filters', 'vector search'], 'results']
//       node    highlighted|sub-label  parallel nodes in one step
```

They animate a single "packet" pass when scrolled into view, loop only while hovered (`components/FlowAnimator.tsx`), and turn into a vertical pipeline on narrow screens.

## What's in here

| Path | What it is |
| --- | --- |
| `app/page.tsx` | Home: hero, experience, project rows, writing, contact |
| `app/projects/[slug]/` | Project pages (static), their `.txt` versions and per-project social images |
| `app/globals.css` | Design tokens (dark + light), fluid type scale, all component styles |
| `components/` | Header with scroll-spy and mobile menu, theme toggle, copy button, pipeline diagrams (`Flow`), local clock |
| `app/card/route.ts` | Plain-text business card. `curl -sL <site>` is rewritten here by user agent (see `next.config.ts`) |
| `app/llms.txt/route.ts` | [llms.txt](https://llmstxt.org) summary for AI assistants, generated from the content file |
| `app/opengraph-image.tsx`, `app/icon.tsx`, `app/apple-icon.tsx` | Social card and icons, rendered with `next/og` from the TTFs in `assets/fonts` |
| `lib/github.ts` | Reads the public GitHub contribution calendar for the home social image (revalidated every 12 h; the last good image keeps serving if GitHub is down) |

## Deploying (Vercel)

Import the repo in Vercel; no configuration is needed. The canonical URL resolves in this order:

1. `NEXT_PUBLIC_SITE_URL` (set this once you add a custom domain, e.g. `https://nikhilmishra.dev`)
2. `VERCEL_PROJECT_PRODUCTION_URL` (set automatically by Vercel)
3. `http://localhost:3000`

It is used for metadata, the sitemap, the OG image and the curl card.

Fonts: Instrument Serif, Geist and Geist Mono (SIL Open Font License), self-hosted via `next/font`.
