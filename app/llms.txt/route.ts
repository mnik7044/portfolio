import { experience, groups, profile, projects, writing } from '@/content/site';
import { flowText } from '@/lib/flow-text';
import { SITE_URL } from '@/lib/site-url';
import { plain } from '@/lib/text';

// llms.txt (https://llmstxt.org) — a clean, factual summary for AI assistants and answer engines.
export const dynamic = 'force-static';

export function GET() {
  const body = [
    `# ${profile.name}`,
    '',
    `> ${plain(profile.metaDescription)}`,
    '',
    '## Experience',
    '',
    ...experience.map((job) => `- ${job.title}, ${job.org} (${job.start} – ${job.end}): ${plain(job.summary)}`),
    '',
    ...groups.flatMap((group) => [
      `## Projects: ${group.title}`,
      '',
      ...projects
        .filter((project) => project.group === group.id)
        .flatMap((project) => [
          `### [${project.name}](${SITE_URL}/projects/${project.slug}) — ${project.org}, ${project.year}`,
          '',
          `${project.tagline} ${project.story.map(plain).join(' ')}`,
          ...(project.flows ?? []).map((flow) => `- ${flow.title ? `${flow.title}: ` : 'Flow: '}${flowText(flow.steps)}`),
          ...(project.outcomes?.length
            ? [`- Outcomes: ${project.outcomes.map((o) => `${o.value} ${o.label}`.replace(/ /g, ' ')).join('; ')}`]
            : []),
          `- Stack: ${project.stack.join(', ')}`,
          '',
        ]),
    ]),
    '## Writing',
    '',
    ...writing.posts.map((post) => `- [${post.title}](${post.href}) (${post.where}, ${post.date})`),
    ...writing.profiles.map((p) => `- ${p.label}: ${p.href}`),
    '',
    '## Contact',
    '',
    `- Email: ${profile.email}`,
    `- GitHub: ${profile.links.github}`,
    `- LinkedIn: ${profile.links.linkedin}`,
    `- Website: ${SITE_URL}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
