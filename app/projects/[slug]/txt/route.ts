import { flowText } from '@/lib/flow-text';
import { projectBySlug, projects } from '@/content/site';
import { SITE_URL } from '@/lib/site-url';
import { plain } from '@/lib/text';

// Plain-text version of a project page, served at /projects/<slug>.txt (see next.config.ts).
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const project = projectBySlug.get((await params).slug);
  if (!project) return new Response('Not found\n', { status: 404 });

  const lines = [
    project.name,
    '='.repeat(project.name.length),
    '',
    `${project.org} · ${project.year}${project.tag ? ` · ${project.tag}` : ''}`,
    '',
    project.tagline,
    '',
    ...project.story.map(plain).flatMap((p) => [p, '']),
    ...(project.flows?.length
      ? ['How it works', '------------', ...project.flows.map((flow) => `${flow.title ? `${flow.title}: ` : ''}${flowText(flow.steps)}`), '']
      : []),
    ...(project.outcomes?.length
      ? ['Outcomes', '--------', ...project.outcomes.map((o) => `- ${o.value.replace(/ /g, ' ')}  ${o.label.replace(/ /g, ' ')}`), '']
      : []),
    `Stack: ${project.stack.join(', ')}`,
    ...(project.links?.length ? project.links.map((link) => `Link: ${link.href}`) : []),
    '',
    `${SITE_URL}/projects/${project.slug}`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
