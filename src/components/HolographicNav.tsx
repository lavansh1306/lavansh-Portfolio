import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { useMotionValue, useSpring } from 'framer-motion';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

const NavLink = ({ href, children, onClick }: NavLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const rotation = useSpring(0, { stiffness: 300, damping: 30 });
  const scale = useSpring(1, { stiffness: 300, damping: 30 });
  
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className="relative px-6 py-2 text-lg group"
      onHoverStart={() => {
        setIsHovered(true);
        rotation.set(10);
        scale.set(1.1);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
        rotation.set(0);
        scale.set(1);
      }}
      style={{
        rotateX: rotation,
        scale
      }}
    >
      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 font-mono">
        {children}
      </span>
      
      {/* Holographic effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-lg -z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Scanlines */}
      {isHovered && (
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <div className="absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        </div>
      )}
      
      {/* Glowing border */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
          opacity: 0,
        }}
        animate={{
          opacity: isHovered ? 0.5 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.a>
  );
};

const HolographicPlane = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 60, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, 60);
    
    const geometry = new THREE.PlaneGeometry(30, 2, 20, 20);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x00ffff) },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float time;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z += sin(pos.x * 2.0 + time) * 0.1;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 color;
        uniform float time;
        
        void main() {
          float intensity = sin(vUv.x * 10.0 + time) * 0.5 + 0.5;
          gl_FragColor = vec4(color, intensity * 0.5);
        }
      `,
      transparent: true,
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    camera.position.z = 5;

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      material.uniforms.time.value = time;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, 60);
      camera.aspect = window.innerWidth / 60;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-[60px] -z-10 opacity-50"
    />
  );
};

const MENU_ITEMS = [
  { 
    href: "#intro", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ), 
    label: "INITIALIZE" 
  },
  { 
    href: "#skills", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ), 
    label: "SKILLS" 
  },
  { 
    href: "#internship", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ), 
    label: "EXPERIENCE" 
  },
  { 
    href: "#projects", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ), 
    label: "PROJECTS" 
  },
  { 
    href: "#achievements", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ), 
    label: "ACHIEVEMENTS" 
  },
  {
    href: "#contact",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "CONNECT"
  }
];

export const HolographicNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [0.5, 1]);
  const navBlur = useTransform(scrollY, [0, 100], [0, 8]);

  // Handle smooth scrolling and section highlighting
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middle = elementRect.height / 3;
      const offsetTop = absoluteElementTop - middle;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const options = {
      rootMargin: '-40% 0px -40% 0px', // Creates a smaller intersection zone in the middle
      threshold: Array.from({ length: 100 }, (_, i) => i / 100) // Creates 100 thresholds for smooth tracking
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const intersectingEntries = entries.filter(entry => entry.isIntersecting);
      
      if (intersectingEntries.length > 0) {
        const mostVisible = intersectingEntries.reduce((prev, current) => {
          // Calculate center point of the element
          const prevRect = prev.boundingClientRect;
          const currentRect = current.boundingClientRect;
          
          const viewportCenter = window.innerHeight / 2;
          const prevDistanceToCenter = Math.abs((prevRect.top + prevRect.bottom) / 2 - viewportCenter);
          const currentDistanceToCenter = Math.abs((currentRect.top + currentRect.bottom) / 2 - viewportCenter);
          
          // Consider both intersection ratio and distance from center
          const prevScore = prev.intersectionRatio * (1 - prevDistanceToCenter / window.innerHeight);
          const currentScore = current.intersectionRatio * (1 - currentDistanceToCenter / window.innerHeight);
          
          return currentScore > prevScore ? current : prev;
        });

        const newActiveSection = mostVisible.target.id;
        setActiveSection(newActiveSection);
      }
      
      setIsScrolled(window.scrollY > 50);
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    
    // Observe all sections
    MENU_ITEMS.forEach(item => {
      const sectionId = item.href.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      className="fixed md:right-0 bottom-0 md:top-0 w-full md:w-64 bg-[#0a0a0a]/30 backdrop-blur-sm md:border-l border-t md:border-t-0 border-[#1a1a1a]/30 z-50 flex flex-col overflow-hidden"
      initial={false}
      style={{
        backgroundColor: `rgba(10, 10, 10, ${navOpacity})`,
        backdropFilter: `blur(${navBlur}px)`,
      }}
    >
      {/* Logo Section - Hide on mobile */}
      <div className="hidden md:block p-6 border-b border-[#1a1a1a]">
        <motion.div
          className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-blue-500 to-violet-600 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Neural Path
        </motion.div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-2 md:py-8 overflow-hidden">
        <div className="flex md:flex-col px-2 md:px-4 md:space-y-2 justify-around md:justify-start h-full">
          {MENU_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <motion.div
                key={item.href}
                className="relative"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <NavLink
                  href={item.href}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                >
                  <motion.div
                    className={`
                      flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg
                      ${isActive 
                        ? 'bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-violet-500/10 text-white/90 shadow-lg shadow-emerald-500/5' 
                        : 'text-gray-400/90 hover:text-gray-200/90 hover:bg-white/5'
                      }
                      transition-all duration-300 backdrop-blur-sm border border-white/5
                      flex-col md:flex-row items-center md:items-start
                    `}
                    initial={{ x: 0 }}
                    animate={{ 
                      x: isActive ? (window.innerWidth >= 768 ? 4 : 0) : 0,
                      scale: isActive ? 1.02 : 1,
                      y: isActive ? (window.innerWidth < 768 ? -4 : 0) : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <span className={`
                      ${isActive 
                        ? 'text-emerald-400 drop-shadow-[0_0_3px_rgba(16,185,129,0.5)]' 
                        : 'text-gray-500/80'
                      } transition-all duration-300 w-6 h-6 md:w-5 md:h-5
                    `}>
                      {item.icon}
                    </span>
                    <span className="font-mono text-[10px] md:text-sm tracking-wider">
                      {item.label}
                    </span>
                  </motion.div>
                </NavLink>

                {isActive && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-16"
                    layoutId="activeSection"
                    initial={{ opacity: 0, scaleY: 0.8 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0.8 }}
                    style={{
                      background: 'linear-gradient(to bottom, #4299E1, #3182CE, #2B6CB0)',
                      boxShadow: '0 0 15px rgba(66, 153, 225, 0.6)'
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer Section - Hide on mobile */}
      <div id="social-links" className="hidden md:block p-6 border-t border-[#1a1a1a]/30">
        <div className="text-center mb-4">
          <h3 className="text-gray-200/90 font-mono text-sm mb-2">NETWORK</h3>
          <div className="h-px w-12 mx-auto bg-gradient-to-r from-emerald-400/50 via-blue-500/50 to-violet-600/50"></div>
        </div>
        <div className="flex items-center justify-center space-x-6">
          <motion.a
            href="https://github.com/lavansh1306"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-3 rounded-lg bg-gray-800/50 group-hover:bg-gray-800 transition-colors">
              <svg className="w-6 h-6 text-gray-400 group-hover:text-emerald-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="mt-2 text-xs text-gray-400 group-hover:text-gray-200 transition-colors">GitHub</span>
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/lavansh-choubey-683355314/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-3 rounded-lg bg-gray-800/50 group-hover:bg-gray-800 transition-colors">
              <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <span className="mt-2 text-xs text-gray-400 group-hover:text-gray-200 transition-colors">LinkedIn</span>
          </motion.a>
        </div>
      </div>

    </motion.nav>
  );
};
