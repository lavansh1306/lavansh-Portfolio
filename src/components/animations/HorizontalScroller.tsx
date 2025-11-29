import React, { useRef } from 'react';
import { useHorizontalPinScroll } from '../../hooks/useHorizontalPinScroll';

type Props = {
  items: React.ReactNode[];
  height?: number;
};

export function HorizontalScroller({ items, height = 360 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useHorizontalPinScroll(ref);
  return (
    <section ref={ref} className="relative w-full" style={{ height }}>
      <div data-h-track className="absolute inset-0 flex gap-4 px-4 md:px-6 will-change-transform">
        {items.map((node, i) => (
          <div
            key={i}
            className="shrink-0 w-[68vw] md:w-[48vw] lg:w-[40vw] h-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 md:p-5"
          >
            {node}
          </div>
        ))}
      </div>
    </section>
  );
}

export default HorizontalScroller;
