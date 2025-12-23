import { useEffect } from 'react';

export function useHorizontalPinScroll(
  containerRef: React.RefObject<HTMLElement>,
  trackSelector = '[data-h-track]'
) {
  useEffect(() => {
    // Disabled - GSAP ScrollTrigger pin conflicts with Lenis smooth scroll
    // Use CSS sticky + Framer Motion instead
    return;
  }, [containerRef, trackSelector]);
}

export default useHorizontalPinScroll;
