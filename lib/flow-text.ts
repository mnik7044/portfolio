import type { FlowStep } from '@/components/Flow';

// "label|sub" → "label (sub)"; parallel steps → "[a | b]"; steps joined with arrows.
const nodeText = (value: string) => {
  const [label, sub] = value.replace(/^\*/, '').split('|');
  return sub ? `${label} (${sub})` : label;
};

export const flowText = (steps: FlowStep[]) =>
  steps.map((step) => (Array.isArray(step) ? `[${step.map(nodeText).join(' | ')}]` : nodeText(step))).join(' → ');
