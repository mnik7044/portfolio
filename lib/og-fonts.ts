import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Static TTFs for next/og (Satori can't read woff2 or variable fonts).
const FONT_DIR = join(process.cwd(), 'assets/fonts');

export async function loadOgFonts() {
  const [serif, serifItalic, mono, monoMedium] = await Promise.all([
    readFile(join(FONT_DIR, 'InstrumentSerif-Regular.ttf')),
    readFile(join(FONT_DIR, 'InstrumentSerif-Italic.ttf')),
    readFile(join(FONT_DIR, 'GeistMono-Regular.ttf')),
    readFile(join(FONT_DIR, 'GeistMono-Medium.ttf')),
  ]);

  return [
    { name: 'Instrument Serif', data: serif, style: 'normal' as const, weight: 400 as const },
    { name: 'Instrument Serif', data: serifItalic, style: 'italic' as const, weight: 400 as const },
    { name: 'Geist Mono', data: mono, style: 'normal' as const, weight: 400 as const },
    { name: 'Geist Mono', data: monoMedium, style: 'normal' as const, weight: 500 as const },
  ];
}
