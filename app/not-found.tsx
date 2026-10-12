import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Not found',
  alternates: { canonical: null },
  openGraph: { url: undefined },
};

export default function NotFound() {
  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link className="wordmark" href="/">
            <span>Nikhil</span> <em>Mishra</em>
            <span className="sr-only">, home</span>
          </Link>
        </div>
      </header>
      <main id="main" className="container not-found">
        <p className="label">404 · route not found</p>
        <h1 className="display">
          <span>Nothing</span>
          <span>
            <em>here</em>
            <span className="accent-dot">.</span>
          </span>
        </h1>
        <p>
          That request returned an empty result set. The rest of the site is very much up —{' '}
          <Link className="link link--accent" href="/">
            head back home
          </Link>
          .
        </p>
      </main>
    </>
  );
}
