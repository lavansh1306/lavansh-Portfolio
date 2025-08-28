import { ReactNode, CSSProperties } from 'react';

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'dossier' | 'achievement';
  onClick?: () => void;
  style?: CSSProperties;
}

export const HolographicCard = ({ 
  children, 
  className = '', 
  variant = 'default',
  onClick,
  style
}: HolographicCardProps) => {
  const baseClasses = "relative overflow-hidden bg-gradient-to-br from-void-light/80 to-void-medium/60 backdrop-blur-sm border";
  
  const variantClasses = {
    default: "border-primary/30 shadow-glow-cyan",
    dossier: "border-neon-purple/40 shadow-glow-purple animate-hologram",
    achievement: "border-neon-gold/50 shadow-[0_0_30px_hsl(var(--neon-gold)/0.3)]"
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className} group interactive`}
      onClick={onClick}
      style={style}
    >
      {/* Holographic scan line effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
      
      {/* Glitch overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 via-transparent to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};