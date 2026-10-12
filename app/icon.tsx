import { ImageResponse } from 'next/og';
import { loadOgFonts } from '@/lib/og-fonts';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default async function Icon() {
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
          borderRadius: 14,
          color: '#ede8dc',
          fontFamily: 'Instrument Serif',
          fontStyle: 'italic',
          fontSize: 54,
          lineHeight: 1,
          paddingBottom: 4,
        }}
      >
        N<span style={{ color: '#ebb65e', fontStyle: 'normal' }}>.</span>
      </div>
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
