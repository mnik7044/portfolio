import { ImageResponse } from 'next/og';
import { profile } from '@/content/site';
import { getContributionCalendar } from '@/lib/github';
import { loadOgFonts } from '@/lib/og-fonts';
import { SITE_HOST } from '@/lib/site-url';

export const alt = 'Nikhil Mishra — Backend Engineer. Agentic systems, data pipelines and LLM backends.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const C = {
  bg: '#12110f',
  fg: '#ede8dc',
  fg2: '#bfb8aa',
  fg3: '#8f897d',
  line: 'rgba(237,232,220,0.12)',
  accent: '#ebb65e',
  // Same ramp as the on-page graph (accent mixed into the empty-cell colour).
  levels: ['#23211d', '#5f4e30', '#8b6e3f', '#bb924e', '#ebb65e'],
};

const WEEKS = 20;
const CELL = 19;
const GAP = 5;

export default async function OpengraphImage() {
  const [fonts, calendar] = await Promise.all([loadOgFonts(), getContributionCalendar(profile.githubUser)]);

  // Last N weeks as columns of 7 days.
  const columns: number[][] = [];
  if (calendar) {
    const first = calendar.weeks - WEEKS;
    for (let col = first; col < calendar.weeks; col++) {
      const days = calendar.days.filter((d) => d.col === col).sort((a, b) => a.row - b.row);
      columns.push(Array.from({ length: 7 }, (_, row) => days.find((d) => d.row === row)?.level ?? -1));
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px 56px',
          background: C.bg,
          color: C.fg,
          fontFamily: 'Geist Mono',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, letterSpacing: 3.2, color: C.fg3 }}>
          <span>BACKEND ENGINEER · KOLKATA, INDIA</span>
          <span style={{ color: C.fg2 }}>VRYSE · AUGUSTA LABS</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Instrument Serif',
              fontSize: 188,
              lineHeight: 0.84,
              letterSpacing: -6,
            }}
          >
            <span>Nikhil</span>
            <span style={{ display: 'flex' }}>
              <span style={{ fontStyle: 'italic' }}>Mishra</span>
              <span style={{ color: C.accent }}>.</span>
            </span>
          </div>

          {columns.length ? (
            <div style={{ display: 'flex', gap: GAP, marginTop: 24 }}>
              {columns.map((column, x) => (
                <div key={x} style={{ display: 'flex', flexDirection: 'column', gap: GAP }}>
                  {column.map((level, y) => (
                    <div
                      key={y}
                      style={{
                        width: CELL,
                        height: CELL,
                        borderRadius: 4,
                        background: level < 0 ? 'transparent' : C.levels[level] ?? C.levels[0],
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', fontFamily: 'Instrument Serif', fontSize: 40, color: C.fg2, letterSpacing: -0.5 }}>
            Agentic systems, data pipelines & LLM backends.
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 20,
              borderTop: `1px solid ${C.line}`,
              fontSize: 18,
              letterSpacing: 1.5,
              color: C.fg3,
            }}
          >
            <span>{calendar ? `${calendar.total.toLocaleString('en-US')} contributions in the last year` : 'github.com/mnik7044'}</span>
            <span style={{ color: C.accent }}>{SITE_HOST}</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
