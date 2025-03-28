import trianglify from 'trianglify';

export type PatternMode = 'triangles' | 'doodles';

const doodleSVGs: string[] = [
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="60"><rect width="100%" height="100%" fill="#fafafa"/><circle cx="80" cy="30" r="25" fill="none" stroke="#222" stroke-width="2"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="60"><rect width="100%" height="100%" fill="#fffbe6"/><path d="M0,30 Q80,0 160,30 Q80,60 0,30 Z" fill="none" stroke="#000" stroke-width="2"/></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="60"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="18" fill="#333">★</text></svg>',
];

export async function generateRandomPattern(mode: PatternMode = 'triangles') {
  const seed = Math.random().toString();

  try {
    if (mode === 'triangles') {
      console.log(`[Trianglify] Generating with seed: ${seed}`);

      const thumbPattern = trianglify({
        width: 160,
        height: 60,
        seed,
      });

      const fullPattern = trianglify({
        width: 1240,
        height: 1748,
        seed,
      });

      const thumbCanvas = await thumbPattern.toCanvas();
      const fullCanvas = await fullPattern.toCanvas();

      const thumbnail = thumbCanvas.toDataURL();
      const full = fullCanvas.toDataURL();

      console.log('[Trianglify] Pattern generated successfully');
      return { thumbnail, full };
    }

    if (mode === 'doodles') {
      const url = doodleSVGs[Math.floor(Math.random() * doodleSVGs.length)];
      return { thumbnail: url, full: url };
    }
  } catch (err) {
    console.error('[PatternGenerator] Pattern generation failed:', err);
  }

  // Fallback gray SVGs if all else fails
  return {
    thumbnail:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="60" fill="#ccc"/>',
    full:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1240" height="1748" fill="#eee"/>',
  };
}
