import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5 } }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export const hoverGrow: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.18 } },
  tap: { scale: 0.98 },
};

export const subtlePulse: Variants = {
  pulse: { boxShadow: ['0 0 0px rgba(6,182,212,0.0)', '0 0 12px rgba(6,182,212,0.08)', '0 0 0px rgba(6,182,212,0.0)'], transition: { duration: 2, repeat: Infinity } },
};

export default { fadeInUp, staggerContainer, hoverGrow, subtlePulse };
