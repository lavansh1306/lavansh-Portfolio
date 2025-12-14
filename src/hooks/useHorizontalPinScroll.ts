import { useEffect } from 'react';
import getGsap, { ScrollTrigger } from '../lib/gsap-setup';

export function useHorizontalPinScroll(
  containerRef: React.RefObject<HTMLElement>,
  trackSelector = '[data-h-track]'
) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const gsap = getGsap();
    const container = containerRef.current;
    if (!container) return;

    const track = container.querySelector(trackSelector) as HTMLElement | null;
    if (!track) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - container.clientWidth;
      gsap.to(track, {
        x: () => -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          // start pinning when the container's top reaches the center of the viewport
          start: 'top center',
          end: () => `+=${totalWidth}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, trackSelector]);
}

export default useHorizontalPinScroll;
