import { useEffect } from 'react';
import getGsap, { ScrollTrigger } from '../lib/gsap-setup';

type RevealOptions = {
  root?: React.RefObject<HTMLElement | null> | HTMLElement | null;
  targets?: string; // child selector
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  stagger?: number;
  once?: boolean;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
};

export function useGsapReveal(options: RevealOptions) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const gsap = getGsap();

    const rootEl = (options.root && 'current' in options.root ? options.root.current : options.root) as HTMLElement | null;
    if (!rootEl) return;

    const ctx = gsap.context(() => {
      const items = options.targets ? rootEl.querySelectorAll(options.targets) : [rootEl];
      const from = options.from ?? { opacity: 0, y: 40 };
      const to = options.to ?? { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' };

      gsap.set(items, from);

      gsap.timeline({
        scrollTrigger: {
          trigger: rootEl,
          start: options.start ?? 'top 80%',
          end: options.end ?? 'bottom 60%',
          toggleActions: options.once ? 'play none none none' : 'play reverse play reverse',
          scrub: options.scrub ?? false,
        },
      }).to(items, { ...to, stagger: options.stagger ?? 0.08 });
    }, rootEl);

    return () => ctx.revert();
  }, [options.root, options.targets, options.once, options.stagger, options.scrub, options.start, options.end]);
}

export default useGsapReveal;
