import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CopyButton } from '@/components/CopyButton';
import { ExternalLink, NEW_TAB } from '@/components/ExternalLink';
import { Folder } from '@/components/Folder';
import { ArrowRight, ArrowUpRight } from '@/components/icons';
import { Rich } from '@/components/Rich';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { SocialLinks } from '@/components/SocialLinks';
import { media } from '@/content/media';
import { contact, experience, groups, hero, nav, profile, projects, writing } from '@/content/site';
import type { Project } from '@/content/site';
import { shortLink } from '@/lib/links';
import { SITE_HOST } from '@/lib/site-url';

const stagger = (i: number) => ({ '--i': i }) as CSSProperties;

function SectionHead({ id, title, meta }: { id: string; title: ReactNode; meta?: string }) {
  return (
    <div className="section-head">
      <h2 className="section-head__title" id={id}>
        {title}
      </h2>
      {meta ? <span className="section-head__meta label">{meta}</span> : null}
    </div>
  );
}

function Hero() {
  const curl = `curl -sL ${SITE_HOST}`;

  return (
    <section className="hero container" id="top" aria-labelledby="hero-title">
      <h1 className="hero__name rise" id="hero-title" style={stagger(0)}>
        Nikhil <em>Mishra</em>
        <span className="accent-dot" aria-hidden="true">
          .
        </span>
      </h1>

      <SocialLinks className="hero__socials rise" style={stagger(1)} />

      <p className="hero__lead rise" style={stagger(2)}>
        <Rich text={hero.lead} />
      </p>

      <div className="terminal rise" style={stagger(3)}>
        <span className="terminal__prompt" aria-hidden="true">
          $
        </span>
        <span className="sr-only">Business card for your terminal: </span>
        <code className="terminal__cmd">{curl}</code>
        <span className="terminal__hint label" aria-hidden="true">
          in a terminal
        </span>
        <CopyButton value={curl} what="terminal business-card command" />
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="container section__body">
        <SectionHead id="experience-title" title="Experience" />
        <ol className="jobs" role="list">
          {experience.map((job) => (
            <li className="job" key={job.org}>
              <div className="job__head">
                <h3 className="job__title">
                  {job.title}
                  <span className="job__at"> at </span>
                  {job.orgUrl ? (
                    <ExternalLink className="link link--accent" href={job.orgUrl}>
                      {job.org}
                    </ExternalLink>
                  ) : (
                    <span className="link--accent">{job.org}</span>
                  )}
                </h3>
                <p className="job__when">
                  {job.start} — {job.end}
                </p>
              </div>
              <p className="job__summary">
                <Rich text={job.summary} />
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const link = project.links?.[0];
  const linkText = link ? shortLink(link.href) : null;
  // Skip a tag that only repeats the link ("npm" next to an npm link).
  const tag = project.tag && project.tag.toLowerCase() !== linkText?.toLowerCase() ? project.tag : null;
  const { brand, shots } = media[project.slug] ?? {};

  return (
    <li className="item focus-item">
      <div className="item__row">
        <span className="thumb" aria-hidden="true">
          {brand ? (
            <span className="thumb__card thumb__card--brand" style={{ '--brand': brand.bg } as CSSProperties}>
              <Image src={brand.mark ?? brand.logo} alt="" sizes="64px" />
            </span>
          ) : (
            <Folder shots={shots} sizes="48px" />
          )}
        </span>
        <span className="item__body">
          <span className="item__name">
            <Link className="item__anchor" href={`/projects/${project.slug}`}>
              {project.name}
            </Link>
            {tag ? <span className="label">{tag}</span> : null}
            {link ? (
              <a className="visit" href={link.href} target="_blank" rel="noreferrer">
                {linkText}
                <ArrowUpRight />
                {NEW_TAB}
              </a>
            ) : null}
          </span>
          <span className="item__desc">{project.line}</span>
        </span>
        <span className="item__side">
          <span className="item__meta">
            {project.org.replace(/ × .*/, '')} · {project.year}
          </span>
          <ArrowRight className="item__arrow" />
        </span>
      </div>
    </li>
  );
}

function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="container section__body">
        <SectionHead id="projects-title" title="Projects" />
        <div className="shelf">
          {groups.map((group) => {
            const items = projects.filter((project) => project.group === group.id);
            const shown = items.slice(0, group.visible);
            const rest = items.slice(group.visible);
            return (
              <div key={group.id}>
                <h3 className="shelf__title">{group.title}</h3>
                <ul className="items focus-list" role="list">
                  {shown.map((project) => (
                    <ProjectRow key={project.slug} project={project} />
                  ))}
                </ul>
                {rest.length ? (
                  <details className="more">
                    <summary>
                      <span className="more__closed">
                        <span aria-hidden="true">more →</span>
                        <span className="sr-only">
                          Show {rest.length} more {group.title}
                        </span>
                      </span>
                      <span className="more__open">
                        <span aria-hidden="true">less ↑</span>
                        <span className="sr-only">Show fewer {group.title}</span>
                      </span>
                    </summary>
                    <ul className="items focus-list" role="list">
                      {rest.map((project) => (
                        <ProjectRow key={project.slug} project={project} />
                      ))}
                    </ul>
                  </details>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PostRow({ post }: { post: (typeof writing.posts)[number] }) {
  return (
    <li className="post focus-item">
      <div className="post__row">
        <a className="post__title" href={post.href} target="_blank" rel="noreferrer">
          {post.title}
          {NEW_TAB}
        </a>
        <span className="post__date">
          {post.date} · {post.where}
        </span>
        <ArrowUpRight className="post__arrow" />
      </div>
    </li>
  );
}

function Writing() {
  const shown = writing.posts.slice(0, writing.visible);
  const rest = writing.posts.slice(writing.visible);

  return (
    <section className="section" id="writing" aria-labelledby="writing-title">
      <div className="container section__body">
        <SectionHead id="writing-title" title="Writing" meta={writing.meta} />
        <ol className="posts focus-list reveal" role="list">
          {shown.map((post) => (
            <PostRow key={post.href} post={post} />
          ))}
        </ol>
        {rest.length ? (
          <details className="more">
            <summary>
              <span className="more__closed">
                <span aria-hidden="true">more →</span>
                <span className="sr-only">Show {rest.length} more articles</span>
              </span>
              <span className="more__open">
                <span aria-hidden="true">less ↑</span>
                <span className="sr-only">Show fewer articles</span>
              </span>
            </summary>
            <ol className="posts focus-list" role="list">
              {rest.map((post) => (
                <PostRow key={post.href} post={post} />
              ))}
            </ol>
          </details>
        ) : null}
        <ul className="writing__all" role="list">
          {writing.profiles.map((profileLink) => (
            <li key={profileLink.href}>
              <ExternalLink href={profileLink.href}>{profileLink.label}</ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container section__body">
        <SectionHead id="contact-title" title="Contact" />
        <p className="contact__pitch">{contact.pitch}</p>
        <div className="contact__email-row">
          <a className="contact__email link" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <CopyButton value={profile.email} what="email address" />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader items={nav} />
      <main id="main">
        <Hero />
        <Experience />
        <Projects />
        <Writing />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
