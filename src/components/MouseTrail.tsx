import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

type CursorVariant = 'code-tail' | 'scanning' | 'analysis' | 'signal' | 'victory' | 'internship' | 'projects';

interface CodeChar {
  id: number;
  char: string;
  x: number;
  y: number;
  createdAt: number;
}

interface VictoryParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'square' | 'number' | 'trophy';
  createdAt: number;
  rotation: number;
  rotationSpeed: number;
}

interface TaskLog {
  id: number;
  text: string;
  x: number;
  y: number;
  createdAt: number;
}

interface MousePosition {
  x: number;
  y: number;
}

const CODE_CHARS = [
  // universal
  '{', '}', '()', '[]', '<>', '=>', '::',

  // Python
  'def', 'class', 'import', 'return', 'async', 'await',

  // Java
  'public', 'static', 'void', 'new',

  // C / C++
  '#include', 'int', 'nullptr', '->', '::',

  // TypeScript / JS
  'const', 'let', 'type', 'interface', 'Promise',

  // Systems / DSA / perf
  'O(n)', 'heap', 'graph', 'cache',

  // Linux / Arch
  'sudo', 'pacman', '-S', '--noconfirm', '|', 'grep'
];
const TRAIL_LIMIT = 12;
const FADE_DURATION = 1500; // ms
const TASK_LOGS = ['DEBUGGING', 'STAGING', 'COMMIT', 'LEARNING'];

const MouseTrail: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('code-tail');
  const [codeTrail, setCodeTrail] = useState<CodeChar[]>([]);
  const trailIdCounter = useRef(0);
  const lastTrailTime = useRef(0);
  
  // Victory mode particle system
  const [victoryParticles, setVictoryParticles] = useState<VictoryParticle[]>([]);
  const particleIdCounter = useRef(0);
  const lastParticleTime = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [victorySnapped, setVictorySnapped] = useState(false);
  
  // Internship mode: task logs
  const [taskLogs, setTaskLogs] = useState<TaskLog[]>([]);
  const taskLogIdCounter = useRef(0);
  const lastTaskLogTime = useRef(0);
  
  // Projects mode: connecting lines trail
  const [mousePositions, setMousePositions] = useState<MousePosition[]>([]);
  const [currentMousePos, setCurrentMousePos] = useState({ x: 0, y: 0 });
  
  // Mouse position with smooth spring physics
  const cursorX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const cursorY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  
  // Brackets/frame position with lag (spring physics) - smoother settings
  const bracketsX = useSpring(cursorX, { damping: 30, stiffness: 150, mass: 0.8 });
  const bracketsY = useSpring(cursorY, { damping: 30, stiffness: 150, mass: 0.8 });
  
  // Victory mode: high-energy explosive spring
  const victoryX = useSpring(cursorX, { damping: 15, stiffness: 400, mass: 0.3 });
  const victoryY = useSpring(cursorY, { damping: 15, stiffness: 400, mass: 0.3 });
  
  // Internship mode: smooth spring
  const internshipX = useSpring(cursorX, { damping: 25, stiffness: 200, mass: 0.5 });
  const internshipY = useSpring(cursorY, { damping: 25, stiffness: 200, mass: 0.5 });
  
  // Projects mode: precise spring
  const projectsX = useSpring(cursorX, { damping: 35, stiffness: 250, mass: 0.4 });
  const projectsY = useSpring(cursorY, { damping: 35, stiffness: 250, mass: 0.4 });

  // Cleanup expired code trail characters
  useEffect(() => {
    if (cursorVariant !== 'code-tail') {
      setCodeTrail([]);
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      setCodeTrail((prev) => prev.filter((char) => now - char.createdAt < FADE_DURATION));
    }, 100);

    return () => clearInterval(interval);
  }, [cursorVariant]);

  // Victory particle generation on mouse move
  useEffect(() => {
    if (cursorVariant !== 'victory') return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastParticleTime.current < 30) return; // Throttle to 30ms
      lastParticleTime.current = now;

      // Generate 2-3 particles per move
      const particleCount = Math.floor(Math.random() * 2) + 2;
      const newParticles: VictoryParticle[] = [];

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 2;
        const type: VictoryParticle['type'] = 
          Math.random() < 0.4 ? 'square' : Math.random() < 0.7 ? 'number' : 'trophy';

        newParticles.push({
          id: particleIdCounter.current++,
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2, // Initial upward velocity
          type,
          createdAt: now,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
        });
      }

      setVictoryParticles((prev) => [...prev, ...newParticles].slice(-50)); // Limit to 50 particles
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorVariant]);

  // Victory particle physics and canvas rendering
  useEffect(() => {
    if (cursorVariant !== 'victory') {
      setVictoryParticles([]);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId: number;
    const GRAVITY = 0.3;
    const PARTICLE_LIFETIME = 1000; // 1 second

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      setVictoryParticles((prevParticles) => {
        const updatedParticles = prevParticles
          .map((particle) => {
            const age = now - particle.createdAt;
            if (age > PARTICLE_LIFETIME) return null;

            // Update physics
            const newVy = particle.vy + GRAVITY;
            const newX = particle.x + particle.vx;
            const newY = particle.y + newVy;
            const newRotation = particle.rotation + particle.rotationSpeed;

            // Calculate opacity with glitch flicker
            const lifeProgress = age / PARTICLE_LIFETIME;
            let opacity = 1 - lifeProgress;
            // Add glitch flicker in last 30%
            if (lifeProgress > 0.7) {
              opacity *= Math.random() > 0.5 ? 1 : 0.3;
            }

            // Draw particle
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.translate(newX, newY);
            ctx.rotate((newRotation * Math.PI) / 180);

            if (particle.type === 'square') {
              ctx.fillStyle = '#00ff88';
              ctx.shadowBlur = 10;
              ctx.shadowColor = '#00ff88';
              ctx.fillRect(-4, -4, 8, 8);
            } else if (particle.type === 'number') {
              ctx.fillStyle = '#00ff88';
              ctx.font = 'bold 14px monospace';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.shadowBlur = 8;
              ctx.shadowColor = '#00ff88';
              ctx.fillText('1', 0, 0);
            } else if (particle.type === 'trophy') {
              // Mini trophy SVG as path
              ctx.strokeStyle = '#00ff88';
              ctx.fillStyle = '#00ff88';
              ctx.lineWidth = 1.5;
              ctx.shadowBlur = 8;
              ctx.shadowColor = '#00ff88';
              // Trophy cup
              ctx.beginPath();
              ctx.moveTo(-5, -3);
              ctx.lineTo(-3, 3);
              ctx.lineTo(3, 3);
              ctx.lineTo(5, -3);
              ctx.closePath();
              ctx.stroke();
              // Trophy handles
              ctx.beginPath();
              ctx.arc(-5, -1, 2, 0, Math.PI * 2);
              ctx.stroke();
              ctx.beginPath();
              ctx.arc(5, -1, 2, 0, Math.PI * 2);
              ctx.stroke();
              // Base
              ctx.fillRect(-4, 3, 8, 1);
            }

            ctx.restore();

            return {
              ...particle,
              x: newX,
              y: newY,
              vx: particle.vx,
              vy: newVy,
              rotation: newRotation,
            };
          })
          .filter((p): p is VictoryParticle => p !== null);

        return updatedParticles;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [cursorVariant]);

  // Internship mode: task log generation
  useEffect(() => {
    if (cursorVariant !== 'internship') {
      setTaskLogs([]);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTaskLogTime.current < 200) return; // Throttle to 200ms
      lastTaskLogTime.current = now;

      const randomTask = TASK_LOGS[Math.floor(Math.random() * TASK_LOGS.length)];
      const newLog: TaskLog = {
        id: taskLogIdCounter.current++,
        text: randomTask,
        x: e.clientX,
        y: e.clientY,
        createdAt: now,
      };

      setTaskLogs((prev) => [...prev, newLog].slice(-8)); // Keep last 8 logs
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorVariant]);

  // Internship mode: cleanup expired task logs
  useEffect(() => {
    if (cursorVariant !== 'internship') return;

    const interval = setInterval(() => {
      const now = Date.now();
      setTaskLogs((prev) => prev.filter((log) => now - log.createdAt < 2000)); // 2s lifetime
    }, 100);

    return () => clearInterval(interval);
  }, [cursorVariant]);

  // Projects mode: track mouse positions for connecting lines
  useEffect(() => {
    if (cursorVariant !== 'projects') {
      setMousePositions([]);
      return;
    }

    let lastUpdateTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle to 16ms (~60fps) for smooth performance
      if (now - lastUpdateTime < 16) return;
      lastUpdateTime = now;
      
      setCurrentMousePos({ x: e.clientX, y: e.clientY });
      setMousePositions((prev) => {
        const newPositions = [...prev, { x: e.clientX, y: e.clientY }];
        return newPositions.slice(-5); // Keep last 5 positions
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorVariant]);

  // Victory mode: detect victory cards and snap effect
  useEffect(() => {
    if (cursorVariant !== 'victory') {
      setVictorySnapped(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const victoryCard = target.closest('.victory-card') as HTMLElement;

      if (victoryCard) {
        const rect = victoryCard.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Check if mouse is inside card bounding box
        if (
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom
        ) {
          setVictorySnapped(true);
          return;
        }
      }
      setVictorySnapped(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorVariant]);

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = 'none';
    
    // Track mouse position and generate code trail
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Generate code trail for 'code-tail' variant
      if (cursorVariant === 'code-tail') {
        const now = Date.now();
        // Throttle trail generation (every 80ms for performance)
        if (now - lastTrailTime.current > 80) {
          lastTrailTime.current = now;
          
          const randomChar = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
          const newChar: CodeChar = {
            id: trailIdCounter.current++,
            char: randomChar,
            x: e.clientX + (Math.random() - 0.5) * 20, // Add slight randomness
            y: e.clientY + (Math.random() - 0.5) * 20,
            createdAt: now,
          };

          setCodeTrail((prev) => {
            const updated = [...prev, newChar];
            return updated.slice(-TRAIL_LIMIT); // Keep only last N characters
          });
        }
      }

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, [role="button"], [onclick]');
      setIsHovering(!!isInteractive);
      
      // For scanning mode: detect skill cards
      if (cursorVariant === 'scanning') {
        const skillCard = target.closest('[data-skill-card]') as HTMLElement;
        setHoveredElement(skillCard);
      } else {
        setHoveredElement(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Intersection Observer to detect section changes
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: [0, 0.1, 0.5],
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Find the entry with highest intersection ratio
      const sortedEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      
      if (sortedEntries.length === 0) return;
      
      const mostVisible = sortedEntries[0];
      const sectionId = mostVisible.target.id;
      
      // Map section IDs to cursor variants
      if (sectionId === 'intro' || sectionId === 'hero') {
        setCursorVariant('code-tail');
      } else if (sectionId === 'skills') {
        setCursorVariant('scanning');
      } else if (sectionId === 'internships' || sectionId === 'internship') {
        setCursorVariant('internship');
      } else if (sectionId === 'projects') {
        setCursorVariant('projects');
      } else if (sectionId === 'experience') {
        setCursorVariant('analysis');
      } else if (sectionId === 'contact') {
        setCursorVariant('signal');
      } else if (sectionId === 'achievements' || sectionId === 'victory-archives') {
        setCursorVariant('victory');
      }
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observe all major sections - use a timeout to ensure DOM is ready
    setTimeout(() => {
      const sections = document.querySelectorAll(
        '#intro, #hero, #skills, #internship, #internships, #projects, #experience, #contact, #achievements, #victory-archives'
      );
      
      sections.forEach((section) => {
        observer.observe(section);
      });
      
      // Initial detection: find which section is currently visible
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      let initialVariant: CursorVariant = 'code-tail';
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const sectionBottom = sectionTop + rect.height;
        const viewportCenter = scrollY + viewportHeight / 2;
        
        // Check if viewport center is within this section
        if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
          const sectionId = section.id;
          if (sectionId === 'intro' || sectionId === 'hero') {
            initialVariant = 'code-tail';
          } else if (sectionId === 'skills') {
            initialVariant = 'scanning';
          } else if (sectionId === 'internship' || sectionId === 'internships') {
            initialVariant = 'internship';
          } else if (sectionId === 'projects') {
            initialVariant = 'projects';
          } else if (sectionId === 'experience') {
            initialVariant = 'analysis';
          } else if (sectionId === 'contact') {
            initialVariant = 'signal';
          } else if (sectionId === 'achievements' || sectionId === 'victory-archives') {
            initialVariant = 'victory';
          }
        }
      });
      
      setCursorVariant(initialVariant);
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY, cursorVariant]);

  // Get snapped position for scanning mode
  const getSnappedPosition = () => {
    if (cursorVariant === 'scanning' && hoveredElement) {
      const rect = hoveredElement.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
      };
    }
    return null;
  };

  const snappedPos = getSnappedPosition();

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ willChange: 'transform' }}>
      {/* Canvas for victory particles */}
      {cursorVariant === 'victory' && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: 9998 }}
        />
      )}

      {/* CODE TRAIL for 'code-tail' variant */}
      <AnimatePresence>
        {cursorVariant === 'code-tail' && codeTrail.map((char) => {
          const age = Date.now() - char.createdAt;
          const opacity = Math.max(0, 1 - age / FADE_DURATION);
          
          return (
            <motion.div
              key={char.id}
              className="absolute font-mono text-[#00ff88] font-bold pointer-events-none select-none"
              style={{
                left: char.x,
                top: char.y,
                fontSize: '14px',
                textShadow: '0 0 8px rgba(0, 255, 136, 0.8)',
              }}
              initial={{ opacity: 0.8, scale: 1, y: 0 }}
              animate={{
                opacity: opacity * 0.6,
                scale: 0.7,
                y: 15,
                x: (Math.random() - 0.5) * 10,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: FADE_DURATION / 1000,
                ease: 'easeOut',
              }}
            >
              {char.char}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* CENTRAL DOT (always present) */}
      <motion.div
        className="absolute rounded-full bg-[#00ff88]"
        style={{
          left: cursorX,
          top: cursorY,
          x: -3,
          y: -3,
          width: '6px',
          height: '6px',
          boxShadow: '0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px rgba(0, 255, 136, 0.5)',
          willChange: 'transform',
        }}
        animate={{
          scale: cursorVariant === 'signal' ? [1, 1.2, 1] : 1,
        }}
        transition={{
          scale: {
            duration: 1.5,
            repeat: cursorVariant === 'signal' ? Infinity : 0,
            ease: 'easeInOut',
          },
        }}
      />

      {/* ANALYSIS MODE: Rotating loading ring */}
      <AnimatePresence>
        {cursorVariant === 'analysis' && (
        <>
          <motion.div
            className="absolute rounded-full border-2 border-[#00ff88]"
            style={{
              left: cursorX,
              top: cursorY,
              borderTopColor: 'transparent',
              boxShadow: '0 0 10px rgba(0, 255, 136, 0.6)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 360,
              width: isHovering ? '48px' : '24px',
              height: isHovering ? '48px' : '24px',
              x: isHovering ? -24 : -12,
              y: isHovering ? -24 : -12,
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
              width: { type: 'spring', damping: 20, stiffness: 300 },
              height: { type: 'spring', damping: 20, stiffness: 300 },
              rotate: { duration: 1.5, repeat: Infinity, ease: 'linear' },
            }}
          />
          
          {/* DATA_VIEW tag when hovering */}
          <AnimatePresence>
            {isHovering && (
              <motion.div
                className="absolute font-mono text-[10px] text-[#00ff88] whitespace-nowrap"
                style={{
                  left: cursorX,
                  top: cursorY,
                  y: -5,
                  textShadow: '0 0 8px rgba(0, 255, 136, 0.8)',
                }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 18 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                &lt;DATA_VIEW/&gt;
              </motion.div>
            )}
          </AnimatePresence>
        </>
        )}
      </AnimatePresence>

      {/* SIGNAL MODE: Pulsing wave */}
      <AnimatePresence>
        {cursorVariant === 'signal' && (
        <>
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute rounded-full border-2 border-[#00ff88]"
              style={{
                left: cursorX,
                top: cursorY,
                width: '40px',
                height: '40px',
                x: -20,
                y: -20,
              }}
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 2.5, 2.5],
                opacity: [0.8, 0.3, 0],
              }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.4,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
        )}
      </AnimatePresence>

      {/* RETICLE BRACKETS / SCANNING FRAME */}
      <AnimatePresence mode="wait">
        {(cursorVariant === 'code-tail' || cursorVariant === 'scanning') && (
          <motion.div
            key={`bracket-${cursorVariant}`}
            className="absolute"
            style={{
              left: snappedPos ? snappedPos.x : bracketsX,
              top: snappedPos ? snappedPos.y : bracketsY,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: isHovering && !snappedPos ? 1.2 : 1,
              rotate: isHovering && !snappedPos ? 45 : 0,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              opacity: { duration: 0.2 },
              scale: { type: 'spring', damping: 20, stiffness: 300 },
              rotate: { type: 'spring', damping: 20, stiffness: 300 },
            }}
          >
          {cursorVariant === 'code-tail' && (
            <>
              {/* Top-left bracket */}
              <div
                className="absolute"
                style={{
                  width: '14px',
                  height: '14px',
                  left: '-20px',
                  top: '-20px',
                  borderLeft: '2px solid #00ff88',
                  borderTop: '2px solid #00ff88',
                  filter: 'drop-shadow(0 0 6px rgba(0, 255, 136, 0.8))',
                }}
              />
              {/* Top-right bracket */}
              <div
                className="absolute"
                style={{
                  width: '14px',
                  height: '14px',
                  right: '-20px',
                  top: '-20px',
                  borderRight: '2px solid #00ff88',
                  borderTop: '2px solid #00ff88',
                  filter: 'drop-shadow(0 0 6px rgba(0, 255, 136, 0.8))',
                }}
              />
              {/* Bottom-left bracket */}
              <div
                className="absolute"
                style={{
                  width: '14px',
                  height: '14px',
                  left: '-20px',
                  bottom: '-20px',
                  borderLeft: '2px solid #00ff88',
                  borderBottom: '2px solid #00ff88',
                  filter: 'drop-shadow(0 0 6px rgba(0, 255, 136, 0.8))',
                }}
              />
              {/* Bottom-right bracket */}
              <div
                className="absolute"
                style={{
                  width: '14px',
                  height: '14px',
                  right: '-20px',
                  bottom: '-20px',
                  borderRight: '2px solid #00ff88',
                  borderBottom: '2px solid #00ff88',
                  filter: 'drop-shadow(0 0 6px rgba(0, 255, 136, 0.8))',
                }}
              />
            </>
          )}

          {cursorVariant === 'scanning' && (
            <motion.div
              className="absolute border-2 border-[#00ff88] rounded-sm"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(0, 255, 136, 0.9))',
                background: snappedPos
                  ? 'radial-gradient(circle, rgba(0, 255, 136, 0.05) 0%, transparent 70%)'
                  : 'none',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: snappedPos ? [1, 1.02, 1] : 1,
                width: snappedPos ? `${snappedPos.width}px` : '60px',
                height: snappedPos ? `${snappedPos.height}px` : '60px',
                left: snappedPos ? `-${snappedPos.width / 2}px` : '-30px',
                top: snappedPos ? `-${snappedPos.height / 2}px` : '-30px',
              }}
              transition={{
                opacity: { duration: 0.3 },
                scale: snappedPos
                  ? { duration: 0.3, repeat: Infinity }
                  : { type: 'spring', damping: 25, stiffness: 300 },
                width: { type: 'spring', damping: 25, stiffness: 300 },
                height: { type: 'spring', damping: 25, stiffness: 300 },
                left: { type: 'spring', damping: 25, stiffness: 300 },
                top: { type: 'spring', damping: 25, stiffness: 300 },
              }}
            >
              {/* Corner glitch indicators when snapped */}
              {snappedPos && (
                <>
                  {[
                    { x: -4, y: -4 },
                    { x: snappedPos.width - 4, y: -4 },
                    { x: -4, y: snappedPos.height - 4 },
                    { x: snappedPos.width - 4, y: snappedPos.height - 4 },
                  ].map((pos, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-[#00ff88] rounded-full"
                      style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                        boxShadow: '0 0 8px #00ff88',
                      }}
                      animate={{
                        opacity: [1, 0.3, 1],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* VICTORY MODE: Double-circle with rotating notches */}
      <AnimatePresence>
        {cursorVariant === 'victory' && (
          <>
            {/* Outer circle with rotating notches */}
            <motion.div
              className="absolute"
              style={{
                left: victoryX,
                top: victoryY,
                willChange: 'transform',
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 360,
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                opacity: { duration: 0.3 },
                scale: { 
                  type: 'spring', 
                  damping: 15, 
                  stiffness: 400,
                  mass: 0.3 
                },
                rotate: { 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: 'linear' 
                },
              }}
            >
              {/* Outer circle */}
              <motion.div
                className="absolute rounded-full border-2 border-[#00ff88]"
                style={{
                  boxShadow: '0 0 20px rgba(0, 255, 136, 0.8), 0 0 40px rgba(0, 255, 136, 0.4)',
                  filter: 'drop-shadow(0 0 10px #00ff88)',
                }}
                animate={{
                  width: victorySnapped ? '300px' : '50px',
                  height: victorySnapped ? '300px' : '50px',
                  x: victorySnapped ? -150 : -25,
                  y: victorySnapped ? -150 : -25,
                }}
                transition={{
                  type: 'spring',
                  damping: 20,
                  stiffness: 300,
                }}
              >
                {/* 4 Notches on outer circle */}
                {[0, 90, 180, 270].map((angle) => (
                  <motion.div
                    key={angle}
                    className="absolute bg-[#00ff88]"
                    style={{
                      width: victorySnapped ? '12px' : '6px',
                      height: victorySnapped ? '3px' : '2px',
                      top: '50%',
                      left: victorySnapped ? 'calc(50% - 6px)' : 'calc(50% - 3px)',
                      transformOrigin: 'center',
                      transform: `rotate(${angle}deg) translateY(${victorySnapped ? '-150px' : '-25px'})`,
                      boxShadow: '0 0 8px #00ff88',
                    }}
                    transition={{
                      width: { type: 'spring', damping: 20, stiffness: 300 },
                      height: { type: 'spring', damping: 20, stiffness: 300 },
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Inner pulsing circle */}
            <motion.div
              className="absolute rounded-full"
              style={{
                left: victoryX,
                top: victoryY,
                background: victorySnapped 
                  ? 'radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(0, 255, 136, 0.6) 0%, rgba(0, 255, 136, 0.2) 70%, transparent 100%)',
                boxShadow: '0 0 30px rgba(0, 255, 136, 0.6)',
                mixBlendMode: victorySnapped ? 'difference' : 'normal',
                willChange: 'transform, width, height',
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: [1, 1.2, 1],
                width: victorySnapped ? '300px' : '30px',
                height: victorySnapped ? '300px' : '30px',
                x: victorySnapped ? -150 : -15,
                y: victorySnapped ? -150 : -15,
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                opacity: { duration: 0.3 },
                scale: { 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                },
                width: { 
                  type: 'spring', 
                  damping: 15, 
                  stiffness: 400,
                  mass: 0.3 
                },
                height: { 
                  type: 'spring', 
                  damping: 15, 
                  stiffness: 400,
                  mass: 0.3 
                },
                x: { 
                  type: 'spring', 
                  damping: 15, 
                  stiffness: 400,
                  mass: 0.3 
                },
                y: { 
                  type: 'spring', 
                  damping: 15, 
                  stiffness: 400,
                  mass: 0.3 
                },
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* INTERNSHIP MODE: Terminal bar with loading circle and task logs */}
      <AnimatePresence mode="wait">
        {cursorVariant === 'internship' && (
          <motion.div
            key="internship-cursor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Blinking vertical terminal bar */}
            <motion.div
              className="absolute bg-[#00ff88]"
              style={{
                left: internshipX,
                top: internshipY,
                width: '2px',
                height: '20px',
                y: -10,
                boxShadow: '0 0 8px #00ff88',
                willChange: 'opacity',
              }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{
                opacity: { duration: 0.8, repeat: Infinity, ease: 'linear' },
              }}
            />

            {/* Small rotating loading circle */}
            <motion.div
              className="absolute rounded-full border-2 border-[#00ff88]"
              style={{
                left: internshipX,
                top: internshipY,
                width: '16px',
                height: '16px',
                x: 8,
                y: -8,
                borderTopColor: 'transparent',
                boxShadow: '0 0 6px rgba(0, 255, 136, 0.6)',
                willChange: 'transform',
              }}
              animate={{ rotate: 360 }}
              transition={{
                rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
              }}
            />

            {/* Task Logs trail */}
            <AnimatePresence>
              {taskLogs.map((log) => {
                const age = Date.now() - log.createdAt;
                const opacity = Math.max(0, 1 - age / 2000);

                return (
                  <motion.div
                    key={log.id}
                    className="absolute font-mono text-[#00ff88] font-bold pointer-events-none select-none whitespace-nowrap"
                    style={{
                      left: log.x,
                      top: log.y,
                      fontSize: '10px',
                      textShadow: '0 0 6px rgba(0, 255, 136, 0.8)',
                    }}
                    initial={{ opacity: 0.9, y: 0 }}
                    animate={{
                      opacity: opacity * 0.7,
                      y: 20,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 2,
                      ease: 'easeOut',
                    }}
                  >
                    [{log.text}]
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROJECTS MODE: Architectural crosshair with coordinates and connecting lines */}
      <AnimatePresence mode="wait">
        {cursorVariant === 'projects' && (
          <motion.div
            key="projects-cursor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Connecting lines between last 5 positions */}
            {mousePositions.length > 1 && (
              <svg
                className="absolute inset-0 pointer-events-none"
                style={{ width: '100%', height: '100%', willChange: 'contents' }}
              >
                <AnimatePresence>
                  {mousePositions.slice(0, -1).map((pos, index) => {
                    const nextPos = mousePositions[index + 1];
                    const opacity = (index + 1) / mousePositions.length;
                    return (
                      <motion.line
                        key={`line-${index}-${pos.x}-${pos.y}`}
                        x1={pos.x}
                        y1={pos.y}
                        x2={nextPos.x}
                        y2={nextPos.y}
                        stroke="#00ff88"
                        strokeWidth="1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: opacity * 0.4 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        style={{
                          filter: 'drop-shadow(0 0 2px rgba(0, 255, 136, 0.6))',
                        }}
                      />
                    );
                  })}
                </AnimatePresence>
              </svg>
            )}

            {/* Large architectural crosshair */}
            <motion.div
              className="absolute"
              style={{
                left: projectsX,
                top: projectsY,
                willChange: 'transform',
              }}
            >
              {/* Horizontal line */}
              <motion.div
                className="absolute bg-[#00ff88]"
                style={{
                  width: '60px',
                  height: '1px',
                  x: -30,
                  boxShadow: '0 0 4px rgba(0, 255, 136, 0.6)',
                }}
              />
              {/* Vertical line */}
              <motion.div
                className="absolute bg-[#00ff88]"
                style={{
                  width: '1px',
                  height: '60px',
                  y: -30,
                  boxShadow: '0 0 4px rgba(0, 255, 136, 0.6)',
                }}
              />
              {/* Center dot */}
              <motion.div
                className="absolute rounded-full bg-[#00ff88]"
                style={{
                  width: '4px',
                  height: '4px',
                  x: -2,
                  y: -2,
                  boxShadow: '0 0 6px #00ff88',
                }}
              />

              {/* Coordinate display */}
              <motion.div
                className="absolute font-mono text-[#00ff88] font-bold pointer-events-none select-none whitespace-nowrap"
                style={{
                  fontSize: '8px',
                  x: 8,
                  y: -20,
                  textShadow: '0 0 4px rgba(0, 255, 136, 0.8)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                X:{Math.round(currentMousePos.x)} Y:{Math.round(currentMousePos.y)}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MouseTrail;
