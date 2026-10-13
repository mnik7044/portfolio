import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Flow } from '@/components/Flow';
import { FlowAnimator } from '@/components/FlowAnimator';
import { Gallery } from '@/components/Gallery';
import { ArrowLeft, ArrowRight, ArrowUpRight, FileIcon } from '@/components/icons';
import { Rich } from '@/components/Rich';
import { SiteFooter } from '@/components/SiteFooter';
import { ThemeToggle } from '@/components/ThemeToggle';
import { media } from '@/content/media';
import { projectBySlug, projects } from '@/content/site';
import { plain } from '@/lib/text';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = projectBySlug.get((await params).slug);
  if (!project) return {};
  const description = `${project.tagline} ${plain(project.line)}`;
  return {
    title: project.name,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { type: 'article', url: `/projects/${project.slug}`, title: `${project.name} — Nikhil Mishra`, description },
    twitter: { card: 'summary_large_image', title: `${project.name} — Nikhil Mishra`, description },
  };
}

const stagger = (i: number) => ({ '--i': i }) as CSSProperties;

export default async function ProjectPage({ params }: Params) {
  const project = projectBySlug.get((await params).slug);
  if (!project) notFound();

  const { brand, shots } = media[project.slug] ?? {};
  const index = projects.indexOf(project);
  const previous = projects[index - 1];
  const next = projects[index + 1];

  return (
    <>
      <main id="main" className="project">
        <nav className="project__bar rise" style={stagger(0)} aria-label="Project">
          <Link className="project__back" href="/#projects">
            <ArrowLeft aria-hidden="true" />
            back
          </Link>
          <div className="project__tools">
            <a className="project__txt" href={`/projects/${project.slug}.txt`}>
              <FileIcon aria-hidden="true" />
              .txt
              <span className="sr-only"> — plain-text version</span>
            </a>
            <ThemeToggle />
          </div>
        </nav>

        {brand ? (
          <div
            className="project__cover project__cover--brand rise"
            style={{ ...stagger(1), '--brand': brand.bg } as CSSProperties}
            aria-hidden="true"
          >
            <Image className="project__logo" src={brand.logo} alt="" sizes="(min-width: 48rem) 20rem, 50vw" preload />
          </div>
        ) : (
          <div className="project__cover rise" style={stagger(1)} aria-hidden="true">
            <span className="project__glyph">{project.glyph ?? project.name.charAt(0)}</span>
            <span className="project__cover-org label">{project.org}</span>
            <span className="project__cover-year label">{project.year}</span>
          </div>
        )}

        <header className="project__head rise" style={stagger(2)}>
          <h1 className="project__title">{project.name}</h1>
          <p className="project__org">{project.tag ? `${project.tag} · ` : ''}{project.org.replace(/ × .*/, '')}</p>
        </header>
        <p className="project__tagline rise" style={stagger(3)}>
          {project.tagline}
        </p>

        {project.links?.length ? (
          <ul className="project__links rise" style={stagger(4)} role="list">
            {project.links.map((link) => (
              <li key={link.href}>
                <a className="cta" href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                  <ArrowUpRight />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="project__story rise" style={stagger(5)}>
          {project.story.map((paragraph) => (
            <p key={paragraph}>
              <Rich text={paragraph} />
            </p>
          ))}
        </div>

        <ul className="pills" role="list" aria-label="Stack">
          {project.stack.map((item) => (
            <li className="pill" key={item}>
              {item}
            </li>
          ))}
        </ul>

        {shots?.length ? <Gallery shots={shots} name={project.name} /> : null}

        {project.outcomes?.length ? (
          <dl className="outcomes project__outcomes">
            {project.outcomes.map((outcome) => (
              <div className="outcome" key={outcome.label}>
                <dt className="outcome__label">{outcome.label}</dt>
                <dd className="outcome__value">{outcome.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {project.flows?.length ? (
          <section className="project__flows" aria-labelledby="flows-title">
            <h2 className="label" id="flows-title">
              How it works
            </h2>
            <div className="flows">
              {project.flows.map((flow, i) => (
                <Flow key={flow.title ?? i} title={flow.title} steps={flow.steps} />
              ))}
            </div>
          </section>
        ) : null}

        <nav className="pager" aria-label="More projects">
          {previous ? (
            <Link className="pager__link" href={`/projects/${previous.slug}`}>
              <span className="label">
                <ArrowLeft aria-hidden="true" /> Previous
              </span>
              <span className="pager__name">{previous.name}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="pager__link pager__link--next" href={`/projects/${next.slug}`}>
              <span className="label">
                Next <ArrowRight aria-hidden="true" />
              </span>
              <span className="pager__name">{next.name}</span>
            </Link>
          ) : null}
        </nav>
      </main>
      <FlowAnimator />
      <SiteFooter />
    </>
  );
}
