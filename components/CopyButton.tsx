'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckIcon, CopyIcon } from './icons';

type CopyButtonProps = {
  value: string;
  /** What is being copied, for screen readers, e.g. "email address". */
  what: string;
  label?: string;
};

type State = 'idle' | 'copied' | 'failed';

export function CopyButton({ value, what, label = 'Copy' }: CopyButtonProps) {
  const [state, setState] = useState<State>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    let next: State = 'copied';
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      next = 'failed';
    }
    setState(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState('idle'), 2000);
  }

  const visible = state === 'copied' ? 'Copied' : state === 'failed' ? 'Select it instead' : label;
  const announcement =
    state === 'copied' ? `Copied ${what} to clipboard` : state === 'failed' ? `Couldn’t copy the ${what}. Select the text instead.` : '';

  return (
    <span className="copy">
      <button type="button" className="copy-button" data-state={state} onClick={copy} aria-label={`Copy ${what}`}>
        {state === 'copied' ? <CheckIcon /> : <CopyIcon />}
        <span aria-hidden="true">{visible}</span>
      </button>
      <span className="sr-only" role="status">
        {announcement}
      </span>
    </span>
  );
}
