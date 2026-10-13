'use client';

import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

export type NavItem = { id: string; label: string };

export function SiteHeader({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLElement>(null);

  // Hairline under the header once the page has scrolled.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  // Highlight the section that crosses the middle of the viewport.
  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Last section in document order that crosses the middle band, or none (e.g. in the hero).
        const current = sections.filter((section) => visible.has(section.id)).pop();
        setActive(current ? current.id : null);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  // Close the mobile menu on Escape or when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      // Hand focus back to the toggle if it was inside the menu that's about to hide.
      if (mobileNav.current?.contains(document.activeElement)) menuButton.current?.focus();
      setOpen(false);
    };
    const wide = window.matchMedia('(min-width: 52rem)');
    const onWide = () => wide.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    return () => {
      window.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
    };
  }, [open]);

  return (
    <header
      className="site-header"
      data-scrolled={scrolled || open}
      onBlur={(event) => {
        // A disclosure menu shouldn't stay open (and cover the page) once focus has left it.
        if (open && !event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <div className="container site-header__inner">
        <a className="wordmark" href="#top">
          <span>Nikhil</span> <em>Mishra</em>
          <span className="sr-only">, back to top</span>
        </a>

        <nav className="site-nav" aria-label="Sections">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="label"
              aria-current={active === item.id ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            className="menu-button label"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="menu-button__bars" aria-hidden="true" />
            Menu
          </button>
        </div>
      </div>

      <nav ref={mobileNav} id="mobile-nav" className="mobile-nav container" aria-label="Sections" hidden={!open}>
        <ul role="list">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
