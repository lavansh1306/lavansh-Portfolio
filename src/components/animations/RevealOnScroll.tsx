import React, { useRef } from 'react';
import { useGsapReveal } from '../../hooks/useGsapReveal';

type Props = React.PropsWithChildren<{
  selector?: string;
  className?: string;
  once?: boolean;
  stagger?: number;
}>;

export function RevealOnScroll({ selector = '[data-reveal]', className, once = true, stagger = 0.08, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useGsapReveal({ root: ref, targets: selector, once, stagger });
  return (
    <div ref={ref} className={`${className ? className + ' ' : ''}relative`}>
      {children}
    </div>
  );
}

export default RevealOnScroll;
