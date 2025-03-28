export type PatternMode = 'dots' | 'waves' | 'grids';

const svgPatterns: Record<PatternMode, string[]> = {
  dots: [
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="60"><rect width="100%" height="100%" fill="white"/><circle cx="10" cy="10" r="2" fill="gray" /></svg>'
  ],
  waves: [
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="60"><rect width="100%" height="100%" fill="white"/><path d="M0,30 Q40,0 80,30 T160,30" stroke="gray" fill="none" stroke-width="2" /></svg>'
  ],
  grids: [
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="60"><rect width="100%" height="100%" fill="white"/><path d="M0 10 H160 M0 20 H160 M0 30 H160 M0 40 H160 M0 50 H160 M10 0 V60 M20 0 V60 M30 0 V60 M40 0 V60 M50 0 V60" stroke="lightgray" stroke-width="1"/></svg>'
  ]
};

export async function generateRandomPattern(mode: PatternMode = 'dots') {
  try {
    const patterns = svgPatterns[mode];
    const url = patterns[Math.floor(Math.random() * patterns.length)];
    return { thumbnail: url, full: url };
  } catch (err) {
    console.error('[PatternGenerator] Pattern generation failed:', err);
  }

  // Fallback gray SVGs if all else fails
  return {
    thumbnail:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="60" fill="#ccc"/>',
    full:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1240" height="1748" fill="#eee"/>'
  };
}
