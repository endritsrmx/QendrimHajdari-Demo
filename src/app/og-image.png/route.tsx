import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const dynamic = 'force-static';

export async function GET() {
  const [serif, sans] = await Promise.all([
    readFile(join(process.cwd(), 'src/assets/cormorant-garamond-latin-500-normal.woff')),
    readFile(join(process.cwd(), 'src/assets/manrope-latin-500-normal.woff')),
  ]);
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#F7F4EE', padding: 80, color: '#263633' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <svg width="72" height="72" viewBox="0 0 48 48" fill="none">
            <circle cx="22" cy="22" r="16.5" stroke="#263633" strokeWidth="1.25" />
            <path d="M16.5 14.5v15M27.5 14.5v15M16.5 22h11" stroke="#263633" strokeWidth="1.25" />
            <path d="M33.5 33.5 41 41" stroke="#B49C7C" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: 'Cormorant', fontSize: 34, letterSpacing: 8 }}>QENDRIM HAJDARI</div>
            <div style={{ fontFamily: 'Manrope', fontSize: 14, letterSpacing: 4, color: '#555D58', marginTop: 6 }}>ORTHOPAEDIC &amp; TRAUMA SURGERY</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Cormorant', fontSize: 92, lineHeight: 1 }}>
          <div>Precision in care.</div>
          <div style={{ fontStyle: 'normal', color: '#33463f' }}>Confidence in movement.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'Manrope', fontSize: 18, letterSpacing: 4, color: '#555D58' }}>
          <div style={{ width: 48, height: 1, background: '#B49C7C' }} />
          PRISHTINA · GJILAN · KOSOVO
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Cormorant', data: serif, weight: 500, style: 'normal' },
        { name: 'Manrope', data: sans, weight: 500, style: 'normal' },
      ],
    },
  );
}
