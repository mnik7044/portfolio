import { ImageResponse } from 'next/og';
import { projectBySlug, projects } from '@/content/site';
import { loadOgFonts } from '@/lib/og-fonts';
import { SITE_HOST } from '@/lib/site-url';

export const alt = 'A project by Nikhil Mishra, backend engineer.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

const C = { bg: '#12110f', fg: '#ede8dc', fg2: '#bfb8aa', fg3: '#8f897d', line: 'rgba(237,232,220,0.12)', accent: '#ebb65e' };

export default async function ProjectImage({ params }: { params: Promise<{ slug: string }> }) {
  const project = projectBySlug.get((await params).slug);
  const fonts = await loadOgFonts();
  const name = project?.name ?? 'Project';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px 56px',
          background: C.bg,
          color: C.fg,
          fontFamily: 'Geist Mono',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, letterSpacing: 3.2, color: C.fg3 }}>
          <span>NIKHIL MISHRA · PROJECT</span>
          <span style={{ color: C.fg2 }}>{project ? `${project.org} · ${project.year}`.toUpperCase() : ''}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Instrument Serif',
              fontStyle: 'italic',
              fontSize: name.length > 18 ? 118 : 150,
              lineHeight: 0.95,
              letterSpacing: -3,
            }}
          >
            {name}
            <span style={{ color: C.accent, fontStyle: 'normal' }}>.</span>
          </div>
          {project ? (
            <div style={{ display: 'flex', fontFamily: 'Instrument Serif', fontSize: 44, color: C.fg2, letterSpacing: -0.5 }}>
              {project.tagline}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 20,
            borderTop: `1px solid ${C.line}`,
            fontSize: 18,
            letterSpacing: 1.5,
            color: C.fg3,
          }}
        >
          <span>{project ? project.stack.slice(0, 4).join(' · ') : ''}</span>
          <span style={{ color: C.accent }}>{SITE_HOST}</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
