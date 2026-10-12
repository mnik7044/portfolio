'use client';

import { useEffect } from 'react';

/**
 * Plays the "packet" pass through each pipeline diagram once, the first time it scrolls into view.
 * Looping is CSS-only on hover / focus, so nothing moves for more than a few seconds unasked.
 */
export function FlowAnimator() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const flows = document.querySelectorAll<HTMLElement>('.flow');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.play = 'true';
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 },
    );
    flows.forEach((flow) => observer.observe(flow));
    return () => observer.disconnect();
  }, []);

  return null;
}
