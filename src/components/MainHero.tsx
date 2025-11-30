import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeInUp, hoverGrow } from '../lib/animations';
import { Parallax } from 'react-scroll-parallax';
import { HologramAvatar } from './HologramAvatar';

const GlitchText = ({ children }: { children: React.ReactNode }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`inline-block ${isGlitching ? 'glitch' : ''}`}>
      {children}
    </span>
  );
};

export const MainHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: '#00ff88',
      transparent: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(particlesMesh);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-black to-[#001a12] overflow-hidden">
      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 99% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      <div className="relative z-10 h-full min-h-screen flex items-center justify-center py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto w-full">
          {/* Two-column grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Text Content (60% width on desktop) */}
            <div className="lg:col-span-3 text-center lg:text-left order-2 lg:order-1">
              <Parallax translateY={[-10, 10]}>
                <motion.h1
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 tracking-tighter"
                >
                  <span className="text-white">Lavansh</span>{' '}
                  <span 
                    className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff41] to-cyan-200"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(0, 255, 65, 0.8))'
                    }}
                  >
                    Choubey
                  </span>
                </motion.h1>
              </Parallax>

              <Parallax translateY={[10, -10]}> 
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light mb-8 tracking-wide font-mono">
                    Full-Stack Developer{' '}
                    <span className="text-[#00ff41]">•</span>{' '}
                    AI Enthusiast{' '}
                    <span className="text-[#00ff41]">•</span>{' '}
                    Hackathon Winner
                    <span 
                      className="inline-block w-0.5 h-5 ml-1 bg-[#00ff41] align-middle"
                      style={{
                        animation: 'blink 1s step-end infinite'
                      }}
                    />
                  </h2>
                </motion.div>
              </Parallax>

              <Parallax translateY={[0, -20]}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans mb-8"
                >
                  <p>
                    Transforming complex challenges into elegant solutions at scale.
                    Specialized in enterprise architecture and AI systems.
                  </p>
                </motion.div>
              </Parallax>

              <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeInUp} 
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6"
              >
                <motion.a
                  href="https://drive.google.com/file/d/1ruhizQz6NZX2rUsf9XtXCJZWyZr8kGUD/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-3 bg-transparent border border-[#00ff41] text-[#00ff41] font-medium flex items-center gap-2 transition-all duration-300 hover:bg-[#00ff41] hover:text-black hover:font-bold hover:shadow-[0_0_20px_rgba(0,255,65,0.8)]"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%)'
                  }}
                  variants={hoverGrow}
                  whileHover="hover"
                  whileTap="tap"
                >
                  View Resume
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </motion.a>
              </motion.div>
            </div>

            {/* Right Column - Hologram Avatar (40% width on desktop) */}
            <div className="lg:col-span-2 flex items-center justify-center order-1 lg:order-2">
              <HologramAvatar 
                src="/MY-IMAGE.jpg" 
                alt="Lavansh Choubey - Cyberpunk Profile"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
