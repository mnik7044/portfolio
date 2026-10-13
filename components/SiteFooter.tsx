import { SocialLinks } from './SocialLinks';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p className="site-footer__note">
          © {new Date().getFullYear()} Nikhil Mishra ·{' '}
          <a className="link" href="/llms.txt">
            llms.txt
          </a>
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
