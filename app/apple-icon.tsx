import { ImageResponse } from 'next/og';
import { loadOgFonts } from '@/lib/og-fonts';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#12110f',
          color: '#ede8dc',
          fontFamily: 'Instrument Serif',
          fontStyle: 'italic',
          fontSize: 150,
          lineHeight: 1,
          paddingBottom: 10,
        }}
      >
        N<span style={{ color: '#ebb65e', fontStyle: 'normal' }}>.</span>
      </div>
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
