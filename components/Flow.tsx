import type { CSSProperties } from 'react';
import { ArrowRight } from './icons';

/**
 * A step is one node, or an array of nodes that run in parallel / as alternatives.
 * Node syntax: "label", "label|sub-label", and a leading "*" marks the interesting part.
 *   e.g. '*complexity router|SQL · RAG · hybrid'
 */
export type FlowStep = string | string[];

export type FlowSpec = { title?: string; steps: FlowStep[] };

type ParsedNode = { label: string; sub?: string; accent: boolean };

function parseNode(value: string): ParsedNode {
  const accent = value.startsWith('*');
  const [label, sub] = (accent ? value.slice(1) : value).split('|');
  return { label: label.trim(), sub: sub?.trim() || undefined, accent };
}

function Node({ value }: { value: string }) {
  const { label, sub, accent } = parseNode(value);
  return (
    <span className={accent ? 'flow__node flow__node--accent' : 'flow__node'}>
      <span className="flow__label">{label}</span>
      {sub ? <span className="flow__sub">{sub}</span> : null}
    </span>
  );
}

export function Flow({ steps, title }: FlowSpec) {
  return (
    <figure className="flow" style={{ '--steps': steps.length } as CSSProperties}>
      {title ? <figcaption className="flow__title label">{title}</figcaption> : null}
      <ol className="flow__track" role="list">
        {steps.map((step, index) => (
          <li className="flow__step" key={index} style={{ '--n': index } as CSSProperties}>
            {index > 0 ? <ArrowRight className="flow__arrow" /> : null}
            {Array.isArray(step) ? (
              <ul className="flow__group" role="list" aria-label="In parallel">
                {step.map((value) => (
                  <li key={value}>
                    <Node value={value} />
                  </li>
                ))}
              </ul>
            ) : (
              <Node value={step} />
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
