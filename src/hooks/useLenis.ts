import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useLenis = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const lenis = new Lenis({
      duration: 0.6,
      lerp: 0.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    // Store globally
    (window as any).lenisInstance = lenis;

    // RAF loop
    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Update ScrollTrigger only
    const onLenisScroll = () => {
      try {
        ScrollTrigger.update();
      } catch (e) {
        // ignore
      }
    };
    if (typeof lenis.on === 'function') lenis.on('scroll', onLenisScroll);

    // Handle anchor clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (anchor) {
        e.preventDefault();
        const id = anchor.getAttribute('href')?.slice(1);
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            lenis.scrollTo(element, {
              offset: 0,
              duration: 0.6,
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      try {
        if (typeof lenis.off === 'function') lenis.off('scroll', onLenisScroll);
      } catch (e) {
        // ignore
      }
      try {
        lenis.destroy();
      } catch (e) {
        // ignore
      }
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
};
