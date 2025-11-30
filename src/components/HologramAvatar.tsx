import React from 'react';
import { motion } from 'framer-motion';

interface HologramAvatarProps {
  src: string;
  alt?: string;
}

export const HologramAvatar: React.FC<HologramAvatarProps> = ({ src, alt = "Profile" }) => {
  return (
    <motion.div
      className="hologram-avatar-wrapper"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <div className="hologram-avatar">
        <img src={src} alt={alt} className="avatar-image" />
        <div className="green-tint-overlay" />
        <div className="scanlines" />
        <div className="glitch-lines" />
        <div className="vignette" />
        <svg className="hud-border" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon 
            points="25,0 75,0 100,25 100,75 75,100 25,100 0,75 0,25" 
            fill="none" 
            stroke="rgba(0, 255, 65, 0.5)"
          />
        </svg>
      </div>

      <style>{`
        .hologram-avatar-wrapper {
          position: relative;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          padding: 30px;
          /* Neon glow using drop-shadow (works with clip-path) */
          filter: drop-shadow(0 0 5px #00ff41) drop-shadow(0 0 15px #00ff41);
          transition: filter 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hologram-avatar-wrapper:hover {
          /* Enhanced glow on hover */
          filter: drop-shadow(0 0 8px #00ff41) drop-shadow(0 0 20px #00ff41) drop-shadow(0 0 30px rgba(0, 255, 65, 0.8));
        }

        .hologram-avatar {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
          clip-path: polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%);
          overflow: hidden;
          /* No background fill - glow comes only from edges */
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hologram-avatar:hover {
          transform: scale(1.03);
        }

        /* Matrix-style green monochrome image treatment */
        .avatar-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          
          /* Refined filter: dark green and defined, not bright white/neon */
          filter: 
            grayscale(100%) 
            brightness(0.7) 
            contrast(1.2) 
            sepia(100%) 
            hue-rotate(90deg) 
            saturate(200%);
          
          transition: filter 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          /* Subtle glitch on image itself */
          animation: glitch-image 4s infinite linear alternate-reverse;
        }

        .hologram-avatar:hover .avatar-image {
          /* Reveal natural colors on hover */
          filter: brightness(1.05);
        }

        /* Green tint overlay removed for darker look */
        .green-tint-overlay {
          display: none;
        }

        /* CRT Scanlines - TV line interference effect */
        .scanlines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 2px,
            rgba(0, 255, 65, 0.3) 3px
          );
          animation: scanline-move 6s linear infinite;
          z-index: 2;
          opacity: 1;
          transition: opacity 0.5s ease;
        }

        .hologram-avatar:hover .scanlines {
          /* Reduce scanline opacity on hover */
          opacity: 0.6;
        }

        @keyframes scanline-move {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(12px);
          }
        }

        /* Additional glitch lines effect */
        .glitch-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background: repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 100px,
            rgba(0, 255, 65, 0.03) 100px,
            rgba(0, 255, 65, 0.03) 101px
          );
          z-index: 2;
          opacity: 0.4;
        }

        /* Vignette to darken edges and hide background */
        .vignette {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          box-shadow: inset 0 0 30px 10px rgba(0, 0, 0, 0.9);
          z-index: 3;
        }

        /* Sharp HUD border - glass screen with metal edge */
        .hud-border {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 4;
          filter: drop-shadow(0 0 2px rgba(0, 255, 65, 0.3));
        }

        .hud-border polygon {
          stroke-width: 1px;
        }

        /* Glitch layer 1 - red shift */
        .hologram-avatar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          clip-path: polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%);
          background: 
            linear-gradient(90deg, transparent 0%, rgba(255, 0, 0, 0.4) 50%, transparent 100%),
            linear-gradient(0deg, transparent 0%, rgba(255, 0, 0, 0.2) 50%, transparent 100%);
          opacity: 0;
          z-index: 5;
          mix-blend-mode: screen;
          pointer-events: none;
          animation: glitch-anim 4s infinite linear alternate-reverse;
        }

        /* Glitch animation for pseudo-elements - RGB channel separation */
        @keyframes glitch-anim {
          /* Quiet period - stable (90% of the time) */
          0%, 90% {
            transform: translate(0, 0);
            opacity: 0;
          }
          /* Active glitch 1 - horizontal shift right */
          91% {
            transform: translate(3px, 0);
            opacity: 0.9;
          }
          91.5% {
            transform: translate(-3px, 0);
            opacity: 0.9;
          }
          92% {
            transform: translate(0, 0);
            opacity: 0;
          }
          /* Active glitch 2 - vertical shift */
          94% {
            transform: translate(0, -4px);
            opacity: 0.8;
          }
          94.5% {
            transform: translate(0, 4px);
            opacity: 0.8;
          }
          95% {
            transform: translate(0, 0);
            opacity: 0;
          }
          /* Active glitch 3 - diagonal shift */
          97% {
            transform: translate(-2px, -3px);
            opacity: 0.7;
          }
          97.5% {
            transform: translate(2px, 3px);
            opacity: 0.7;
          }
          98%, 100% {
            transform: translate(0, 0);
            opacity: 0;
          }
        }

        /* Glitch animation for image - subtle position shifts */
        @keyframes glitch-image {
          /* Quiet period - stable */
          0%, 92% {
            transform: translate(0, 0);
          }
          /* Active glitch moments */
          92.5% {
            transform: translate(-1px, 1px);
          }
          93% {
            transform: translate(1px, -1px);
          }
          93.5% {
            transform: translate(0, 0);
          }
          95% {
            transform: translate(2px, 0);
          }
          95.5% {
            transform: translate(-2px, 0);
          }
          96%, 100% {
            transform: translate(0, 0);
          }
        }

        /* Glitch layer 2 - cyan shift */
        .hologram-avatar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          clip-path: polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%);
          background: 
            linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.4) 50%, transparent 100%),
            linear-gradient(0deg, transparent 0%, rgba(0, 255, 255, 0.2) 50%, transparent 100%);
          opacity: 0;
          z-index: 5;
          mix-blend-mode: screen;
          pointer-events: none;
          animation: glitch-anim 4s infinite linear alternate-reverse;
          animation-delay: 0.15s;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .hologram-avatar-wrapper {
            max-width: 280px;
            padding: 15px;
          }
        }

        @media (max-width: 480px) {
          .hologram-avatar-wrapper {
            max-width: 220px;
            padding: 10px;
          }
        }
      `}</style>
    </motion.div>
  );
};
