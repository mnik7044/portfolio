// Short, recognisable label for a project's public link: "npm", "GitHub" or the bare domain.
export function shortLink(href: string): string {
  const host = new URL(href).hostname.replace(/^www\./, '');
  if (host === 'npmjs.com') return 'npm';
  if (host === 'github.com') return 'GitHub';
  return host;
}
