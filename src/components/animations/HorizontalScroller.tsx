import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  items: React.ReactNode[];
  // kept for backward compatibility, but reveal-on-scroll uses Framer Motion's
  // `whileInView` / `viewport` by default so you don't need to toggle this.
  startAnimations?: boolean;
  gap?: number;
  height?: number;
};

export function HorizontalScroller({ items, startAnimations = true, gap = 24, height = 360 }: Props) {
  // Restore horizontal sticky scroller layout, but add two motion layers:
  // 1) outer motion for reveal-on-scroll (y / opacity)
  // 2) inner motion for continuous horizontal movement (x keyframes loop)

  const itemWidthClass = 'shrink-0 snap-start w-[80vw] md:w-[45vw] lg:w-[35vw] h-full flex flex-col';

  return (
    <section className="relative w-full">
      {/* reveal the whole scroller when it enters viewport */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="sticky top-0 w-full" style={{ height }}>
          <div className="h-full flex items-center overflow-hidden">
            {/* track: duplicated items for seamless looping */}
            <motion.div
              className="flex gap-6 items-stretch"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            >
              {/** render two copies of items back-to-back for a smooth loop */}
              {[...items, ...items].map((node, i) => {
                // make keys unique across the duplicated list
                const key = `loop-${i}-${i < items.length ? 'a' : 'b'}`;
                return (
                  <div key={key} className={itemWidthClass}>
                    <div className="w-full h-full">
                      {node}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default HorizontalScroller;
