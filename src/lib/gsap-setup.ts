import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export function getGsap() {
  if (typeof window !== 'undefined' && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return gsap;
}

export { ScrollTrigger };

export function killScrollTriggers(scope?: HTMLElement | null) {
  if (typeof window === 'undefined') return;
  ScrollTrigger.getAll().forEach((st) => {
    if (!scope) st.kill(true);
    else if ((st as any).trigger && scope.contains((st as any).trigger)) st.kill(true);
  });
}

export default getGsap;
