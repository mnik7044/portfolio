'use client';

import { useSyncExternalStore } from 'react';
import { MoonIcon, SunIcon } from './icons';

type Theme = 'light' | 'dark';

const THEME_COLORS: Record<Theme, string> = { dark: '#12110f', light: '#f4f1e9' };

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem('theme');
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // With no explicit choice saved, follow the OS when it switches between light and dark.
  const media = window.matchMedia('(prefers-color-scheme: light)');
  const onSystemChange = () => {
    if (!storedTheme()) applyTheme(media.matches ? 'light' : 'dark', { persist: false });
  };
  media.addEventListener('change', onSystemChange);

  return () => {
    observer.disconnect();
    media.removeEventListener('change', onSystemChange);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function getServerSnapshot(): Theme | null {
  return null;
}

function applyTheme(theme: Theme, { persist = true }: { persist?: boolean } = {}) {
  document.documentElement.dataset.theme = theme;
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
  if (!persist) return;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Storage can be unavailable (private mode); the toggle still works for this visit.
  }
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const next: Theme = theme === 'light' ? 'dark' : 'light';

  function toggle() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion && 'startViewTransition' in document) {
      document.startViewTransition(() => applyTheme(next));
    } else {
      applyTheme(next);
    }
  }

  return (
    <button
      type="button"
      className="icon-button"
      onClick={toggle}
      aria-label={theme ? `Switch to ${next} theme` : 'Toggle colour theme'}
      title={theme ? `Switch to ${next} theme` : undefined}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
