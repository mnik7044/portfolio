'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { Shot } from '@/content/media';
import { CloseIcon } from './icons';

const SIZES = '(min-width: 48rem) 44rem, calc(100vw - 2rem)';

/** Swipeable screenshot strip with dots; a click opens the shot full size. */
export function Gallery({ shots, name }: { shots: Shot[]; name: string }) {
  const track = useRef<HTMLUListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { root: el, threshold: 0.6 },
    );
    for (const slide of el.children) observer.observe(slide);
    return () => observer.disconnect();
  }, []);

  function go(index: number) {
    const el = track.current;
    const slide = el?.children[index] as HTMLElement | undefined;
    if (!el || !slide) return;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: slide.offsetLeft, behavior: smooth ? 'smooth' : 'auto' });
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const next = Math.min(shots.length - 1, Math.max(0, active + (event.key === 'ArrowRight' ? 1 : -1)));
    go(next);
    (track.current?.children[next]?.querySelector('button') as HTMLButtonElement | null)?.focus({ preventScroll: true });
  }

  function show(index: number) {
    setOpen(index);
    dialog.current?.showModal();
  }

  const shown = open === null ? null : shots[open];

  return (
    <section className="gallery" aria-roledescription="carousel" aria-label={`${name} screenshots`}>
      <ul className="gallery__track" ref={track} role="list" onKeyDown={onKeyDown}>
        {shots.map((shot, i) => (
          <li
            className="gallery__slide"
            key={shot.src.src}
            data-index={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${shots.length}`}
          >
            <button type="button" className="shot" onClick={() => show(i)}>
              <span className="shot__bar" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <Image className="shot__img" src={shot.src} alt={shot.alt} sizes={SIZES} placeholder="blur" />
              <span className="sr-only">Open full size</span>
            </button>
          </li>
        ))}
      </ul>

      {shots.length > 1 ? (
        <div className="gallery__dots">
          {shots.map((shot, i) => (
            <button
              type="button"
              className="gallery__dot"
              key={shot.src.src}
              aria-label={`Show screenshot ${i + 1} of ${shots.length}`}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
      ) : null}

      <dialog
        className="lightbox"
        ref={dialog}
        aria-label={shown?.alt ?? 'Screenshot'}
        onClose={() => setOpen(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        {shown ? <Image className="lightbox__img" src={shown.src} alt={shown.alt} sizes="100vw" /> : null}
        <form method="dialog">
          <button className="lightbox__close icon-button" aria-label="Close">
            <CloseIcon />
          </button>
        </form>
      </dialog>
    </section>
  );
}
