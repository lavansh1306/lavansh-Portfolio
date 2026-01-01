import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  items: React.ReactNode[];
  startAnimations?: boolean;
  gap?: number;
  height?: number;
};

export function HorizontalScroller({ items, startAnimations = true, gap = 24, height = 360 }: Props) {
  // Responsive item width: even smaller on mobile so 3-4 items fit, larger on desktop
  const itemWidthClass = 'shrink-0 snap-start w-[55vw] sm:w-[50vw] md:w-[45vw] lg:w-[35vw] h-full flex flex-col';

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
              className="flex gap-4 sm:gap-5 md:gap-6 items-stretch"
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
