import { useEffect } from 'react';

type RevealOptions = {
  root?: React.RefObject<HTMLElement | null> | HTMLElement | null;
  targets?: string;
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
    // This hook is disabled - use Framer Motion instead
    // GSAP ScrollTrigger conflicts with Lenis
    return;
  }, []);
}

export default useGsapReveal;
