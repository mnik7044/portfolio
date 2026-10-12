import { profile } from '@/content/site';
import { ExternalLink } from './ExternalLink';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div>
            <p className="site-footer__name">
              Nikhil <em>Mishra</em>
            </p>
            <p className="label">
              {profile.role} · {profile.location}
            </p>
          </div>
          <ul className="site-footer__links" role="list">
            <li>
              <ExternalLink href={profile.links.github}>GitHub</ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.links.linkedin}>LinkedIn</ExternalLink>
            </li>
            <li>
              <a className="link" href={`mailto:${profile.email}`}>
                Email
              </a>
            </li>
            <li>
              <a className="link" href="/llms.txt">
                llms.txt
              </a>
            </li>
          </ul>
        </div>
        <div className="site-footer__bottom">
          <p className="label">© {new Date().getFullYear()} Nikhil Mishra</p>
          <p className="label">Set in Instrument Serif, Geist &amp; Geist Mono · Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
