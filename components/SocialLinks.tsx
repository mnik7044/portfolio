import type { CSSProperties } from 'react';
import { profile } from '@/content/site';
import { NEW_TAB } from './ExternalLink';
import { GitHubIcon, LinkedInIcon, MailIcon, XIcon } from './icons';

const external = [
  { label: 'GitHub', href: profile.links.github, Icon: GitHubIcon },
  { label: 'LinkedIn', href: profile.links.linkedin, Icon: LinkedInIcon },
  { label: 'X', href: profile.links.x, Icon: XIcon },
];

/** GitHub, LinkedIn, X and email as a row of icons. */
export function SocialLinks({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <ul className={className ? `socials ${className}` : 'socials'} role="list" style={style}>
      {external.map(({ label, href, Icon }) => (
        <li key={label}>
          <a className="socials__link" href={href} target="_blank" rel="noreferrer" title={label}>
            <Icon />
            <span className="sr-only">{label}</span>
            {NEW_TAB}
          </a>
        </li>
      ))}
      <li>
        <a className="socials__link" href={`mailto:${profile.email}`} title="Email">
          <MailIcon />
          <span className="sr-only">Email</span>
        </a>
      </li>
    </ul>
  );
}
