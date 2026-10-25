'use client';

import dynamic from 'next/dynamic';

// WebGL sky from the main app; client-only and split out so article pages never load it.
// The server HTML (and the fallback while the chunk loads) is the static CSS sky.
const HeroSky = dynamic(() => import('./HeroSky'), {
  ssr: false,
  loading: () => (
    <div className="hero-sky" aria-hidden="true">
      <div className="hero-sky-fallback" />
    </div>
  ),
});

export function HeroSkyLoader() {
  return <HeroSky />;
}
