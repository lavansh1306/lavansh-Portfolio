import React from 'react';
import { Parallax } from 'react-scroll-parallax';

type Props = React.PropsWithChildren<{ speed?: number; className?: string }>;

export function ParallaxBackground({ speed = -20, className, children }: Props) {
  return (
    <Parallax speed={speed} className={className}>
      {children}
    </Parallax>
  );
}

export default ParallaxBackground;
