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

// Buttons
export const buttonVariants: Variants = {
  initial: { y: 0, scale: 1, opacity: 1 },
  hover: { y: -2, scale: 1.02, transition: { duration: 0.16 } },
  tap: { scale: 0.98 },
  disabled: { opacity: 0.5, pointerEvents: 'none' as any },
};

// Cards
export const cardVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  hover: { scale: 1.02, transition: { duration: 0.16 } },
};

// Modal
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 280, damping: 24 } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.15 } },
};

// Page transitions
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export default { fadeInUp, staggerContainer, hoverGrow, subtlePulse, buttonVariants, cardVariants, modalVariants, pageVariants };
