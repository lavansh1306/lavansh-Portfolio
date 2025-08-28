import { useEffect, useState } from 'react';

export const CyberCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.classList.contains('interactive')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Main cursor orb */}
      <div
        className={`fixed top-0 left-0 w-6 h-6 rounded-full z-50 pointer-events-none transition-all duration-200 ease-out mix-blend-difference ${
          isHovering 
            ? 'scale-150 bg-neon-green shadow-glow-green' 
            : 'scale-100 bg-primary shadow-glow-cyan'
        }`}
        style={{
          transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
        }}
      />
      
      {/* Trail effect */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary/40 z-40 pointer-events-none transition-all duration-500 ease-out"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
        }}
      />
      
      {/* Outer ring */}
      <div
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border border-primary/30 z-30 pointer-events-none transition-all duration-300 ease-out ${
          isHovering ? 'scale-150 border-neon-green/50' : 'scale-100'
        }`}
        style={{
          transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
        }}
      />
    </>
  );
};