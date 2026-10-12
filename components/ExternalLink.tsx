import type { ReactNode } from 'react';
import { ArrowUpRight } from './icons';

export const NEW_TAB = <span className="sr-only"> (opens in a new tab)</span>;

/** Keeps the ↗ glued to the last word so it never wraps onto a line of its own. */
function withArrow(children: ReactNode) {
  if (typeof children !== 'string') {
    return (
      <>
        {children}
        <ArrowUpRight />
      </>
    );
  }
  const cut = children.lastIndexOf(' ') + 1;
  return (
    <>
      {children.slice(0, cut)}
      <span className="nobr">
        {children.slice(cut)}
        <ArrowUpRight />
      </span>
    </>
  );
}

export function ExternalLink({ href, children, className = 'link' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {withArrow(children)}
      {NEW_TAB}
    </a>
  );
}
