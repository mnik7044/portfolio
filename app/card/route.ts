import { experience, profile } from '@/content/site';
import { SITE_URL } from '@/lib/site-url';

// Plain-text business card for terminals. `curl -sL <site>` is rewritten here
// (see next.config.ts); it is also reachable directly at /card.
export const dynamic = 'force-static';

const esc = (code: string) => `\x1b[${code}m`;
const reset = esc('0');
const style = {
  bold: (s: string) => `${esc('1')}${s}${reset}`,
  dim: (s: string) => `${esc('2')}${s}${reset}`,
  italic: (s: string) => `${esc('3')}${s}${reset}`,
  amber: (s: string) => `${esc('38;5;179')}${s}${reset}`,
  underline: (s: string) => `${esc('4')}${s}${reset}`,
};

const visibleLength = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, '').length;

function box(lines: string[], width: number) {
  const border = style.dim;
  const top = border(`╭${'─'.repeat(width + 4)}╮`);
  const bottom = border(`╰${'─'.repeat(width + 4)}╯`);
  const body = lines.map((line) => {
    const padding = ' '.repeat(Math.max(0, width - visibleLength(line)));
    return `${border('│')}  ${line}${padding}  ${border('│')}`;
  });
  return [top, ...body, bottom].map((line) => `  ${line}`).join('\n');
}

function row(label: string, value: string) {
  return `${style.dim(label.padEnd(9))}${value}`;
}

export function GET() {
  const current = experience.filter((role) => role.end === 'Present');
  const host = SITE_URL.replace(/^https?:\/\//, '');

  const lines = [
    '',
    style.bold(profile.name),
    style.italic(`${profile.role.toLowerCase()} · ${profile.location}`),
    '',
    ...current.map((role, i) => row(i === 0 ? 'Now' : '', `${role.title} @ ${style.amber(role.org)}`)),
    '',
    row('Builds', 'agentic systems, data pipelines,'),
    row('', 'LLM backends and the infra under them'),
    '',
    row('Stack', 'TypeScript · Python · Node.js · PostgreSQL'),
    row('', 'Trigger.dev · AWS · Cloudflare Workers'),
    '',
    row('Email', style.underline(profile.email)),
    row('GitHub', profile.links.github.replace('https://', '')),
    row('LinkedIn', profile.links.linkedin.replace('https://www.', '').replace(/\/$/, '')),
    row('Web', host),
    '',
  ];

  const width = Math.max(...lines.map(visibleLength));
  const card = `\n${box(lines, width)}\n\n  ${style.dim('→ say hi:')} ${style.amber(`mailto:${profile.email}`)}\n\n`;

  return new Response(card, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=86400',
      Vary: 'User-Agent',
      'X-Robots-Tag': 'noindex',
    },
  });
}
