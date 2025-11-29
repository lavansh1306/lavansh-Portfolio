import React, { useMemo } from 'react';
import HorizontalScroller from './HorizontalScroller';
import RevealOnScroll from './RevealOnScroll';

export function ScrollShowcase() {
  const items = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => (
        <div className="h-full flex flex-col justify-between" data-reveal>
          <div>
            <h3 className="text-2xl font-bold mb-2">Pinned Panel {i + 1}</h3>
            <p className="text-sm text-white/70">
              This panel uses a horizontal pinned section powered by GSAP ScrollTrigger. Scroll to navigate between
              panels.
            </p>
          </div>
          <div className="text-xs text-white/50">Scroll to move →</div>
        </div>
      )),
    []
  );

  return (
    <div className="py-24">
      <RevealOnScroll>
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-8" data-reveal>
          Scroll-triggered Horizontal Showcase
        </h2>
      </RevealOnScroll>
      <HorizontalScroller items={items} />
    </div>
  );
}

export default ScrollShowcase;
