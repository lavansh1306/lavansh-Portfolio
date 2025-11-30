import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeInUp, hoverGrow } from '../lib/animations';
import { Parallax } from 'react-scroll-parallax';

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
    <div ref={containerRef} className="relative h-screen bg-gradient-to-b from-black to-[#001a12] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-4">
          <Parallax translateY={[-10, 10]}>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 tracking-tighter px-4"
          >
            <span className="text-white">Lavansh</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff88] to-[#00a6ff]">
              Choubey
            </span>
          </motion.h1>
          </Parallax>

          <Parallax translateY={[10, -10]}> 
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-2xl md:text-3xl text-gray-300 font-light mb-8 tracking-wide">
              Full-Stack Developer • AI Enthusiast • Hackathon Winner
            </h2>
          </motion.div>
          </Parallax>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <motion.a
              href="https://drive.google.com/file/d/1ruhizQz6NZX2rUsf9XtXCJZWyZr8kGUD/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-3 bg-[#00ff88] text-black font-medium rounded-full flex items-center gap-2"
              variants={hoverGrow}
              whileHover="hover"
              whileTap="tap"
            >
              View Resume
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          </motion.div>

          <Parallax translateY={[0, -20]}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 text-gray-400 text-lg max-w-2xl mx-auto"
          >
            <p>
              Transforming complex challenges into elegant solutions at scale.
              Specialized in enterprise architecture and AI systems.
            </p>
          </motion.div>
          </Parallax>
        </div>
      </div>
    </div>
  );
};
