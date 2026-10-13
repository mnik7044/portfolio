import type { FlowSpec } from '@/components/Flow';

/* ==========================================================================
   Everything on the site comes from this file.
   Strings support **strong** and `code` (see components/Rich.tsx).
   Flow node syntax: "label|sub-label", leading "*" = highlighted node,
   an array = nodes that run in parallel.
   Numbers come from the resume or from repository evidence only.
   ========================================================================== */

export type Link = { label: string; href: string };

export type Job = {
  org: string;
  orgUrl?: string;
  title: string;
  start: string;
  end: string;
  summary: string;
};

export type ProjectGroup = 'systems' | 'products' | 'freelance' | 'oss';

export type Project = {
  slug: string;
  name: string;
  group: ProjectGroup;
  /** Shown on the right of the detail page title, like a category. */
  org: string;
  year: string;
  /** One line for the list row. */
  line: string;
  tagline: string;
  /** Paragraphs on the detail page. */
  story: string[];
  flows?: FlowSpec[];
  outcomes?: { value: string; label: string }[];
  stack: string[];
  links?: Link[];
  /** Small status label, e.g. Live, Pilot, npm. */
  tag?: string;
};

export const profile = {
  name: 'Nikhil Mishra',
  role: 'Backend & Product Engineer',
  location: 'Kolkata, India',
  email: 'mnik7044@gmail.com',
  githubUser: 'mnik7044',
  links: {
    github: 'https://github.com/mnik7044',
    linkedin: 'https://www.linkedin.com/in/nikhil-mishra-8a6710244/',
    x: 'https://x.com/nikktwts',
  },
  currentOrgs: [
    { name: 'Vryse', url: 'https://vryse.co' },
    { name: 'Augusta Labs', url: 'https://www.augustalabs.ai' },
  ],
  education: {
    school: 'Netaji Subhash Engineering College',
    degree: 'B.Tech, Information Technology',
    years: '2022 – 2026',
  },
  metaDescription:
    'Backend and product engineer in Kolkata. I help teams build AI products and scale them — agentic systems, data pipelines and LLM backends. Currently at Vryse and Augusta Labs.',
  keywords: [
    'Backend engineering',
    'Agentic systems',
    'Data pipelines',
    'LLM systems',
    'Node.js',
    'TypeScript',
    'Python',
    'PostgreSQL',
    'Trigger.dev',
    'AWS',
  ],
};

export const hero = {
  lead: 'Three years of tinkering with all sorts of AI products. Now I help teams **build them and scale them**.',
};

export const experience: Job[] = [
  {
    org: 'Vryse',
    orgUrl: 'https://vryse.co',
    title: 'Product Engineer',
    start: 'Jan 2026',
    end: 'Present',
    summary: 'GEO platform. I own the measurement engine, multi-tenant access and the Slack agent.',
  },
  {
    org: 'Augusta Labs',
    orgUrl: 'https://www.augustalabs.ai',
    title: 'Backend Engineer',
    start: 'Mar 2025',
    end: 'Present',
    summary: 'Applied-AI lab in Lisbon. Agentic systems, data pipelines and search for enterprise clients.',
  },
  {
    org: 'Memow',
    orgUrl: 'https://www.linkedin.com/company/memow-in/',
    title: 'Founding Backend Engineer',
    start: 'Jan 2025',
    end: 'Apr 2025',
    summary: 'Moved the whole cloud to Backblaze (**5× cheaper**), made pages **50% faster** and cut release cycles **40%** with CI/CD.',
  },
  {
    org: 'MaxInt',
    orgUrl: 'https://maxint.com/',
    title: 'Contract Backend Engineer',
    start: 'Jun 2024',
    end: 'Jul 2024',
    summary: 'Infrastructure as code on AWS with Terraform and GitHub Actions — **50% faster deploys**, zero manual config errors.',
  },
];

export const groups: { id: ProjectGroup; title: string; visible: number }[] = [
  { id: 'systems', title: 'systems', visible: 3 },
  { id: 'products', title: 'products & tools', visible: 3 },
  { id: 'freelance', title: 'freelance', visible: 3 },
  { id: 'oss', title: 'open source & hackathons', visible: 3 },
];

export const projects: Project[] = [
  /* ---------- systems, hardest first ---------- */
  {
    slug: 'delivery-brain',
    name: 'Delivery Brain',
    group: 'systems',
    org: 'Augusta Labs × Diamant Software',
    year: '2026',
    line: 'Agentic teammate that flags delivery risks in Azure DevOps and grounds coding agents in a graph of the org.',
    tagline: 'An agentic teammate for an engineering org.',
    story: [
      'A client system built with three teammates in about two weeks. It watches Azure DevOps boards and pull requests, raises **evidence-backed delivery risks**, lets an LLM triage them, and hands approved work to AI coding agents.',
      'I owned the deterministic side — the **risk detectors** and the Inngest workflows that queue their signals for triage, plus the review queue and screens — and the **graph context** the agents plan with: a Neo4j graph of the org and a Qdrant-indexed graph of the code, refreshed every 30 minutes and exposed as read-only Mastra tools.',
    ],
    flows: [
      {
        title: 'Detect & triage',
        steps: ['Azure DevOps|work items · PRs', '*risk detectors|12, deterministic', 'Inngest|durable workflows', 'LLM triage|create · merge · ask', 'human review'],
      },
      {
        title: 'Ground the agents',
        steps: [['org graph|Neo4j', 'code graph|Qdrant · 7 repos'], '*graph context API', 'agent tools|Mastra, read-only', 'coding agent|plan → PR'],
      },
    ],
    outcomes: [
      { value: '12', label: 'deterministic delivery-risk detectors' },
      { value: '7', label: 'repositories in the code graph' },
      { value: '30 min', label: 'graph refresh cycle' },
    ],
    stack: ['TypeScript', 'Bun', 'Hono', 'Inngest', 'Mastra', 'Neo4j', 'Qdrant', 'Next.js'],
  },
  {
    slug: 'booking-assistant',
    name: 'AI booking assistant',
    group: 'systems',
    org: 'Augusta Labs × 3t Global',
    year: '2026',
    tag: 'Pilot',
    line: 'Turns training requests and expiring certificates into checked, dated offers a coordinator approves.',
    tagline: 'Four siloed systems, one human-approved offer.',
    story: [
      '3t Global trains offshore and industrial crews. Coordinators re-key every booking across four systems that share no IDs. This assistant reads them all and drafts **dated, prerequisite-checked offers** — a coordinator approves every send and every booking.',
      'I built the intake that turns two request sources into one case shape, the **prerequisite engine** — rule checks plus an LLM reader whose every point must quote the source text — e-learning routing, and the whole **certificate-expiry agent**, including a port of the legacy SQL procedure that reproduces its output row for row.',
      'Piloting on live requests; writes to 3t’s systems stay held back until a person releases them.',
    ],
    flows: [
      {
        title: 'Certificate-expiry agent',
        steps: [
          'daily sweep',
          ['legacy TMS|ported SQL procedure', 'training platform|expiries export'],
          'group|one case per delegate',
          '*refresher resolver|from prerequisite rules',
          ['already handled?|bookings · newer certs', 'prerequisite check'],
          'dates before expiry|last 90 days first',
          'coordinator gate',
        ],
      },
      {
        title: 'Request pipeline',
        steps: [
          ['legacy TMS|request forms', 'training platform|request export'],
          'intake & dedupe|one case shape',
          ['course resolver', 'e-learning router'],
          '*prerequisite reader|LLM, quote-verified',
          'date search|live runs',
          'draft reply',
          'coordinator gate',
        ],
      },
    ],
    outcomes: [
      { value: '83%', label: 'of pilot cases (714 of 855) needed no human read of prerequisite text' },
      { value: 'Daily', label: 'expiry pickup, down from a 19–36-day cycle' },
      { value: '43 / 43', label: 'rows matched when porting the legacy procedure' },
    ],
    stack: ['TypeScript', 'Bun', 'Azure SQL', 'Azure AI Foundry', 'App Service'],
  },
  {
    slug: 'geo-engine',
    name: 'GEO measurement engine',
    group: 'systems',
    org: 'Vryse',
    year: '2026',
    line: 'Measures how often AI answers mention a brand — durable fan-out across five answer engines.',
    tagline: 'How often do AI answers mention your brand?',
    story: [
      'Vryse tracks how brands show up inside AI answers. Each run sends a brand’s prompts to up to five answer engines, works out which companies the answers actually mention and cite, and turns that into Share of Voice and visibility scores.',
      'I moved the pipeline from in-request code onto **durable Trigger.dev runs** with idempotent batches and retry budgets, so a partial failure re-queries only the prompts that failed. I built **entity resolution** that matches mentions by domain, identity tokens and learned aliases, resolved AI Overview and Vertex redirect citations to real publishers, and moved report reads onto a **materialised cache**.',
      'Along the way: Perplexity’s 429s turned out to be a concurrency ceiling, not a rate limit.',
    ],
    flows: [
      {
        steps: [
          'brand prompts',
          '*durable fan-out|Trigger.dev',
          ['ChatGPT', 'Gemini', 'Perplexity', 'AI Overviews', 'Claude|opt-in'],
          'company extraction|batched LLM',
          '*entity resolution|domain · tokens · aliases',
          'Share of Voice|materialised cache',
        ],
      },
    ],
    outcomes: [
      { value: '5', label: 'AI answer engines per run' },
      { value: '−76%', label: 'prompt-row reads per report (60 → 14.5 MB)' },
    ],
    stack: ['Trigger.dev', 'Express', 'Firestore', 'OpenAI', 'Claude', 'Gemini', 'Perplexity'],
    links: [{ label: 'Visit vryse.co', href: 'https://vryse.co' }],
  },
  {
    slug: 'geo-agent',
    name: 'GEO agent for Slack',
    group: 'systems',
    org: 'Vryse',
    year: '2026',
    tag: 'Pilot',
    line: 'Onboards brands into AI-visibility tracking from Slack or Google Chat — a state machine, not a prompt.',
    tagline: 'Onboarding by conversation, not by form.',
    story: [
      'Takes a brand from its website to a first AI-visibility report without leaving Slack or Google Chat.',
      'The conversation is a **pure state machine** with an effect engine — fourteen states, unit-tested without a network. The model only reads replies (English and Hinglish) and drafts text; every number in a reply comes from code. Each chat runs on its own Trigger.dev queue, so messages are handled in order and exactly once.',
      'Running in pilot.',
    ],
    flows: [
      {
        steps: [
          'Slack · Google Chat',
          'gateway|verified webhooks',
          '*per-chat queue|Trigger.dev, in order',
          '*14-state machine|pure transitions',
          ['backend API|as the user', 'LLM|structured output'],
          'reply',
        ],
      },
    ],
    outcomes: [
      { value: '14', label: 'conversation states, tested without a network' },
      { value: '18/18', label: 'live golden set, English & Hinglish' },
    ],
    stack: ['TypeScript', 'Hono', 'Trigger.dev', 'Neon Postgres', 'OpenAI', 'Zod'],
  },
  {
    slug: 'multisector',
    name: 'Multisector',
    group: 'systems',
    org: 'Augusta Labs',
    year: '2025',
    line: 'Matches 400k+ companies to public funding — LLM extraction from government PDFs.',
    tagline: 'Matching 400,000+ companies to public funding.',
    story: [
      'An AI platform that matches Portuguese companies to public funding incentives.',
      'I built the **incentive extraction pipelines** — collect each notice’s PDFs, parse and clean them, have an LLM extract dates, budgets and eligibility, merge per notice and fall back to a second pass to fill gaps — and loaded and indexed the **400k+ company profiles**, 168 fields each with 24 years of revenue. Matching is company-first: shortlist by filters, then match eligibility within the shortlist.',
    ],
    flows: [
      {
        title: 'Incentive ingestion',
        steps: [
          ['PRR portal|open calls', 'PT2030|public notices'],
          'collect PDFs',
          'parse & clean|budget · date sections',
          '*LLM extraction|dates · budget · eligibility',
          'merge per notice|non-null wins',
          '*LLM fallback|fills the gaps',
          'upsert|Postgres',
        ],
      },
      {
        title: 'Company-first matching',
        steps: ['search', ['SQL filters', 'vector search'], '*company shortlist|filters first', 'incentive search', '*eligibility match|query ∩ shortlist', 'results'],
      },
    ],
    outcomes: [
      { value: '400k+', label: 'company profiles, loaded and indexed' },
      { value: '168', label: 'fields per company profile' },
      { value: '24 yrs', label: 'of revenue history per company' },
    ],
    stack: ['TypeScript', 'Bun', 'Hono', 'PostgreSQL', 'OpenAI', 'Pinecone'],
  },

  /* ---------- products & tools ---------- */
  {
    slug: 'create-augusta-app',
    name: 'create-augusta-app',
    group: 'products',
    org: 'Augusta Labs',
    year: '2026',
    tag: 'npm',
    line: 'Augusta Labs’ project scaffolder — I built its React + FastAPI stack.',
    tagline: 'Pick a stack, get a production-shaped repo.',
    story: [
      'An interactive Bun CLI: pick a stack and features, and it copies a CI-tested “golden template”, prunes what you didn’t pick, mints local secrets and installs agent skills for Claude Code and Codex.',
      'I built the **React + FastAPI** stack from scratch — Postgres with Alembic, Redis, S3, Qdrant, Meilisearch, Inngest, Langfuse and more, each optional — plus optional JWT auth (Argon2, reset tokens bound to the password hash) and agent harnesses for Mastra and the OpenAI Agents SDK with eval smoke tests.',
    ],
    flows: [
      {
        steps: ['pick stack & features', 'golden template|CI-tested', '*prune unselected|feature manifests', 'mint local secrets', 'install agent skills|Claude Code · Codex'],
      },
    ],
    outcomes: [
      { value: '13', label: 'optional features in the FastAPI stack' },
      { value: '14', label: 'agent-skill packs mapped to stacks' },
      { value: '3', label: 'agent frameworks scaffolded' },
    ],
    stack: ['Bun', 'TypeScript', 'Python', 'FastAPI', 'React', 'SQLAlchemy'],
    links: [{ label: 'View on npm', href: 'https://www.npmjs.com/package/create-augusta-app' }],
  },
  {
    slug: 'deckiq',
    name: 'DeckIQ',
    group: 'products',
    org: 'Product site',
    year: '2026',
    tag: 'Live',
    line: 'Site, CMS blog and waitlist for a pitch-deck analytics product — shipped in three days.',
    tagline: 'Shipped solo in three days.',
    story: [
      'The production marketing site for DeckIQ, a pitch-deck analytics product: landing page, a Sanity blog with an embedded Studio, and a waitlist.',
      'Pages revalidate on a signed webhook and degrade gracefully if the CMS is down. The waitlist absorbs bot submissions and rate-limits by salted IP hash — raw IPs are never stored.',
    ],
    flows: [
      { title: 'Blog', steps: ['Sanity Studio', 'publish webhook|signed', '*revalidate|cache tags', 'Next.js pages|ISR'] },
      { title: 'Waitlist', steps: ['form', '*API|honeypot · rate limit', 'salted IP hash', 'Neon Postgres|idempotent upsert'] },
    ],
    outcomes: [
      { value: '3 days', label: 'from first commit to production' },
      { value: '10', label: 'production deploys in those days' },
    ],
    stack: ['Next.js 16', 'React 19', 'Sanity', 'Neon Postgres', 'Vercel'],
    links: [{ label: 'Visit deckiq.ai', href: 'https://deckiq.ai' }],
  },
  {
    slug: 'gyst',
    name: 'GYST',
    group: 'products',
    org: 'Augusta Labs',
    year: '2025',
    line: 'Creator analytics across seven platforms — bucketed sync, one daily rollup.',
    tagline: 'Seven creator platforms, one source of truth.',
    story: [
      'GYST gives creators one view of their business across YouTube, Instagram, TikTok, Twitch, Patreon, Beehiiv and Fourthwall.',
      'I built the data service’s sync backbone — a **bucketed scheduler** that spreads users across two-minute ticks, the YouTube and Beehiiv integrations with Redis-cached, quota-aware YouTube reads, and the **aggregation service** that normalises every platform into one daily row with per-platform shares.',
    ],
    flows: [
      {
        steps: [
          'OAuth connect',
          '*bucket scheduler|60 buckets · 2-min tick',
          ['YouTube', 'Instagram', 'TikTok', 'Twitch', 'Patreon', 'Beehiiv', 'Fourthwall'],
          'platform sync|token refresh · upserts',
          '*aggregation|one row per user per day',
          'dashboards',
        ],
      },
    ],
    outcomes: [
      { value: '7', label: 'creator platforms behind one sync interface' },
      { value: '2 h', label: 'Redis cache window for YouTube reads' },
    ],
    stack: ['TypeScript', 'Bun', 'Hono', 'PostgreSQL', 'Drizzle', 'Redis'],
  },
  {
    slug: 'landing-page-generator',
    name: 'AI landing-page generator',
    group: 'products',
    org: 'Vryse',
    year: '2026',
    line: 'Crawls a brand’s site; Claude drafts on-brand, topic-targeted pages. MVP in three days.',
    tagline: 'From a brand’s URL to an on-brand page.',
    story: [
      'Headless Chrome crawls a brand’s site and extracts its design system — colours, fonts, logo, navigation. Claude writes the copy as typed JSON for a human to review, then lays the approved copy out as one self-contained, responsive page.',
      'Opus generates with retry and failover to Sonnet, Sonnet handles plain-English edits, Haiku clusters topics. The MVP — crawler, generation and a visual editor — took three days.',
    ],
    flows: [
      {
        steps: ['brand URL', 'Puppeteer crawl|colours · fonts · nav', '*copy|Claude, typed JSON', 'human review', '*layout|Claude, one HTML file', 'edits|plain English'],
      },
    ],
    outcomes: [
      { value: '3 days', label: 'to a working MVP' },
      { value: '25', label: 'API endpoints across 8 routers' },
      { value: '3', label: 'Claude tiers with retry and failover' },
    ],
    stack: ['TypeScript', 'Express', 'Puppeteer', 'Claude', 'Drizzle', 'Docker'],
  },
  {
    slug: 'rank-tracker',
    name: 'Marketplace rank tracker',
    group: 'products',
    org: 'Vryse',
    year: '2026',
    line: 'Headless-Chrome rank tracker that never mistakes a failed scrape for a drop.',
    tagline: 'Weekly ranks from a shadow-DOM marketplace.',
    story: [
      'Tracks where a product ranks for its keywords in an app marketplace built as a shadow-DOM single-page app, and emails the week’s changes.',
      'Every check ends **found, absent or failed** — failed checks write no history, so a timeout never shows up as a rank drop. Runs are idempotent, Chrome recycles tabs to stay inside memory, and an out-of-memory kill moves the job to a bigger machine automatically.',
    ],
    flows: [
      {
        steps: ['weekly cron', 'headless Chrome|2 tabs', '*walk shadow DOM', 'match listing|id, then name', ['found', 'absent', 'failed|no history'], 'rank history|52 weeks', 'change email'],
      },
    ],
    outcomes: [
      { value: '3', label: 'outcomes per check, so failures never read as drops' },
      { value: '52', label: 'weeks of rank history per keyword' },
    ],
    stack: ['Trigger.dev', 'Puppeteer', 'Firestore', 'Resend'],
  },

  /* ---------- freelance ---------- */
  {
    slug: 'elephantroom',
    name: 'elephantroom',
    group: 'freelance',
    org: 'Freelance',
    year: '2026',
    tag: 'Live',
    line: 'Landing site for an AI interior-design app, co-built.',
    tagline: 'AI home design, presented.',
    story: [
      'Co-built the marketing site for elephantroom, an AI interior-design app. I engineered the style carousel’s motion — proximity-based easing, timed pauses and snap-to-centre on featured styles, synced to the hero phone screen — and the auto-scrolling brand carousel.',
      'Our build became the base of the live site.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Framer Motion', 'Embla'],
    links: [{ label: 'Visit elephantroom.ai', href: 'https://elephantroom.ai' }],
  },
  {
    slug: 'modernstone',
    name: 'Modernstone',
    group: 'freelance',
    org: 'Freelance',
    year: '2025',
    tag: 'Live',
    line: 'First version of a stonework company’s lead-gen site.',
    tagline: 'A lead-gen site in a day.',
    story: [
      'Built the first version of Modernstone’s lead-generation site in about a day: animated hero, services, a four-step process and the contact flow. The client’s developer has restyled it since.',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
    links: [{ label: 'Visit modernstone.co', href: 'https://modernstone.co' }],
  },
  {
    slug: 'age-medical',
    name: 'Age Medical',
    group: 'freelance',
    org: 'Freelance',
    year: '2026',
    tag: 'Team',
    line: 'Clinic platform — I built booking → invoice sync, API guards and care-team chat.',
    tagline: 'From booked appointment to issued invoice.',
    story: [
      'A connected clinic platform — patient portal plus doctor and admin apps for scheduling, invoicing, reports and chat — built with a team of six.',
      'I built the scheduling API client, the **paid booking → invoice** bridge with an idempotent per-booking ledger, the session, role and ownership **guard layer** in front of the API, unified notifications, and doctor–patient chat with read receipts and attachments.',
    ],
    flows: [
      {
        title: 'Booking → invoice',
        steps: [
          'booking|scheduling platform',
          ['signed webhook', '*reconcile poll|missed-webhook fallback'],
          'appointment upsert|Postgres',
          ['notify patient + doctor', 'mark paid'],
          '*invoice ledger|pending → created / failed',
          'invoice + PDF',
        ],
      },
      {
        title: 'Care-team chat',
        steps: ['doctor / patient', '*route guard|session · role · ownership', 'participant check', 'message store|cursor paging', '*unread counts|one SQL aggregate'],
      },
    ],
    outcomes: [
      { value: '78 / 83', label: 'API routes behind one guard' },
      { value: 'N+1 → 1', label: 'query for unread counts' },
    ],
    stack: ['Next.js 16', 'TypeScript', 'Neon Postgres', 'Drizzle', 'better-auth', 'TanStack Query'],
  },
  {
    slug: 'nivara',
    name: 'Nivara',
    group: 'freelance',
    org: 'Freelance',
    year: '2025',
    tag: 'YC',
    line: 'Marketing site for a Y Combinator startup, built in about fifteen hours.',
    tagline: 'A launch site in fifteen hours.',
    story: [
      'Built the launch site for Nivara, a Y Combinator–backed AI-adoption analytics startup, solo in about fifteen hours — including a GSAP orbit that animates AI-tool logos along SVG paths.',
      'It shipped to production; the company has since replaced it.',
    ],
    stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'GSAP'],
  },
  {
    slug: 'fengshui-modern',
    name: 'FengShui Modern',
    group: 'freelance',
    org: 'Connective Labs',
    year: '2025',
    line: 'AI room analysis — GPT-4o vision turns a photo into numbered furniture moves.',
    tagline: 'Feng shui, read from a photo.',
    story: [
      'An AI feng shui app for Connective Labs, co-built with two collaborators. Upload a room photo and GPT-4o vision returns furniture moves as normalised coordinates, drawn as numbered markers on the image.',
      'Paid analyses run through Stripe Checkout with a verified webhook, plus Firebase auth, storage and PDF reports.',
    ],
    flows: [
      { title: 'Analysis', steps: ['room photo', '*GPT-4o vision|normalised coordinates', 'numbered moves|on the photo', 'PDF report'] },
      { title: 'Payments', steps: ['Stripe Checkout', 'signed webhook', 'mark paid|Firestore'] },
    ],
    stack: ['Next.js 15', 'TypeScript', 'GPT-4o', 'Stripe', 'Firebase'],
  },

  /* ---------- open source & hackathons ---------- */
  {
    slug: 'sahakshak',
    name: 'Sahakshak',
    group: 'oss',
    org: 'Diversion 2k24',
    year: '2024',
    tag: 'Hackathon',
    line: 'Police case-management backend, built at Diversion 2k24.',
    tagline: 'Cases, records and evidence, linked.',
    story: [
      'A police case-management platform built by a team of four at the Diversion 2k24 hackathon. I owned the backend: Mongoose schemas for cases, criminal records and evidence, 18 REST endpoints, a request-timeout guard and Firebase Storage image uploads, deployed as a serverless function.',
    ],
    flows: [{ steps: [['web app', 'mobile app'], '*Express API|18 endpoints', ['MongoDB|cases · records · evidence', 'Firebase Storage|evidence images']] }],
    stack: ['Node.js', 'Express', 'MongoDB', 'Firebase Storage', 'Vercel'],
    links: [{ label: 'Source on GitHub', href: 'https://github.com/Sahakashak/sahakshak-backend' }],
  },
  {
    slug: 'macros',
    name: 'macros',
    group: 'oss',
    org: 'Open source',
    year: '2026',
    tag: 'OSS',
    line: 'Gemini meal recommendations for an open-source macro tracker.',
    tagline: 'Ask the tracker what to eat.',
    story: [
      'Contributed to a friend’s open-source macro tracker: Gemini-powered meal recommendations and an “Ask AI” food checker with Zod-validated structured outputs, per-day goal history on libSQL, and a mobile UI pass.',
    ],
    flows: [{ steps: ['question', 'Vercel AI SDK', '*Gemini|Zod-validated output', 'recommendation'] }],
    stack: ['TypeScript', 'TanStack Start', 'Gemini', 'Zod', 'libSQL'],
    links: [{ label: 'Source on GitHub', href: 'https://github.com/Sama-004/macros' }],
  },
  {
    slug: 'linksnap',
    name: 'LinkSnap',
    group: 'oss',
    org: 'Side project',
    year: '2024',
    tag: 'API',
    line: 'URL-shortener API with click analytics, rate limits and tests.',
    tagline: 'Short links, honest analytics.',
    story: [
      'A URL-shortener API: custom aliases, expiring links, bulk creation, QR codes and per-link click analytics by browser, referrer and day — behind JWT and API-key auth with tiered rate limits, and integration-tested against an in-memory MongoDB.',
    ],
    flows: [{ steps: ['create link|JWT or API key', 'rate limit|3 tiers', '*short code|nanoid or alias', 'redirect', '*click analytics|browser · referrer · day'] }],
    stack: ['Node.js', 'Express', 'MongoDB', 'Jest'],
  },
];

export const projectBySlug = new Map(projects.map((project) => [project.slug, project]));

export const writing = {
  meta: '47 articles',
  /** Posts shown before "more →". */
  visible: 3,
  posts: [
    {
      title: 'AWS VPC Deep Dive: Designing Subnets, Route Tables, and NAT Gateways',
      date: 'Jul 2025',
      where: 'Blackslate',
      href: 'https://www.blackslate.io/articles/aws-vpc-deep-dive-designing-subnets-route-tables-and-nat-gateways',
    },
    {
      title: 'Deploying and Maintaining Containers Using AWS ECS',
      date: 'Jul 2025',
      where: 'Blackslate',
      href: 'https://www.blackslate.io/articles/deploying-and-maintaining-containers-using-aws-ecs',
    },
    {
      title: 'Understanding ACID Properties in MongoDB',
      date: 'Aug 2024',
      where: 'Blackslate',
      href: 'https://www.blackslate.io/articles/understanding-acid-properties-in-mongodb',
    },
    {
      title: 'Exploring API Architecture Styles: SOAP, REST, WebRTC, GraphQL, and Webhook',
      date: 'Apr 2024',
      where: 'Hashnode',
      href: 'https://nikk.hashnode.dev/exploring-api-architecture-styles-soap-rest-webrtc-graphql-and-webhook',
    },
    {
      title: 'Building Real-time Video Calling with WebRTC and Node.js',
      date: 'Sep 2023',
      where: 'Blackslate',
      href: 'https://www.blackslate.io/articles/building-real-time-video-calling-with-webrtc-and-node-js',
    },
    {
      title: 'The Single-Threaded Nature of JavaScript and Node.js',
      date: 'Jul 2023',
      where: 'Hashnode',
      href: 'https://nikk.hashnode.dev/unveiling-the-single-threaded-nature-of-javascript-and-nodejs-the-waiter-and-the-restaurant-analogy',
    },
  ],
  profiles: [
    { label: 'All 30 on blackslate.io', short: 'blackslate.io', href: 'https://www.blackslate.io/author/nikhil-mishra' },
    { label: '18 more on Hashnode', short: 'Hashnode', href: 'https://nikk.hashnode.dev' },
  ],
};

export const contact = {
  pitch: 'Building an AI product? Email is the fastest way to reach me.',
};

export const nav = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
];
