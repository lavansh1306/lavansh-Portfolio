import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import * as THREE from 'three';
import { Card } from './ui/card';
import { ExpandableInternshipCard } from './ExpandableInternshipCard';

interface Achievement {
  title: string;
  description: string;
  tech: string[];
  color: string;
}

const achievements: Achievement[] = [
  {
    title: "Physician Portal Authentication",
    description: "Designed and implemented the login page for the physician portal using React and Tailwind CSS, ensuring a responsive and user-friendly interface.",
    tech: ["React", "Tailwind CSS", "Authentication"],
    color: "#00ff88"
  },
  {
    title: "Medical OCR Pipeline",
    description: "Developed an OCR pipeline with PaddleOCR and TrOCR to digitize handwritten prescriptions, improving accuracy on complex medical handwriting.",
    tech: ["PaddleOCR", "TrOCR", "Computer Vision"],
    color: "#ff00ea"
  },
  {
    title: "RAG Implementation",
    description: "Experimented with RAG (Retrieval-Augmented Generation) using SentenceTransformers to enhance AI-driven medical query responses.",
    tech: ["RAG", "SentenceTransformers", "NLP"],
    color: "#00ffff"
  },
  {
    title: "Full-Stack Development",
    description: "Contributed to both frontend and backend modules in a startup environment, gaining exposure to product development in healthcare SaaS.",
    tech: ["Full-Stack", "Healthcare", "SaaS"],
    color: "#ff3366"
  }
];

const HolographicText = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="relative inline-block group">
      {/* Always-visible gradient text */}
      <span className={`relative z-10 transition-all duration-300 bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-transparent bg-300% animate-gradient-x`}>
        {children}
      </span>

      {/* Glitch overlays always active */}
      <span className="absolute inset-0 text-pink-500 animate-glitch-1 z-0" aria-hidden>
        {children}
      </span>
      <span className="absolute inset-0 text-cyan-500 animate-glitch-2 z-0" aria-hidden>
        {children}
      </span>
    </span>
  );
};

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const geometry = new THREE.BufferGeometry();
    const particles = 50;
    const positions = new Float32Array(particles * 3);

    for (let i = 0; i < particles * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x00ff88,
      transparent: true,
      opacity: 0.8,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      points.rotation.x += 0.001;
      points.rotation.y += 0.002;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10" />;
};

export const InternshipShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen py-20 px-4 overflow-hidden bg-black/90"
      style={{ y, opacity }}
    >
      <ParticleField />
      <div className="cyber-grid absolute inset-0 opacity-20"></div>
      
      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center mb-16">
          <HolographicText>
            <h2 className="text-5xl font-bold mb-4">InternShip Experience</h2>
          </HolographicText>
          <motion.div
            className="text-2xl text-cyan-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5 }}
          >
            Niramaya Health | 2025
          </motion.div>
        </div>

        {/* Expandable internship summary + timeline (three identical cards) */}
        <div className="space-y-6">
          <ExpandableInternshipCard />
          <ExpandableInternshipCard
            title="Business Development Intern"
            organization="Phoenix Global"
            dateRange="10/06/2025 – 10/08/2025"
            contributions={[
              'Conducted outreach to MBA colleges and universities to identify potential collaborations for Phoenix Global’s corporate training programs.',
              'Scheduled and participated in meetings with academic decision-makers to present the company’s training and certification offerings.',
              'Researched and shortlisted institutes with high partnership potential using LinkedIn, college directories, and CRM tools.',
              'Coordinated with internal teams to align client requirements with available training solutions.',
              'Supported the business development pipeline through lead tracking, follow-ups, and documentation of meeting outcomes.',
              'Contributed to strengthening institutional partnerships and expanding the company’s academic outreach network.'
            ]}
          />
          <ExpandableInternshipCard />
        </div>
      </motion.div>

      <style>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
        }
        
        .bg-300\% {
          background-size: 300% 100%;
        }
        @keyframes glitch-1 {
          0% { 
            transform: translate(0) skew(0deg);
            text-shadow: -2px 0 #ff00ea;
          }
          20% { 
            transform: translate(-2px, 2px) skew(2deg);
            text-shadow: 4px 0 #ff00ea;
          }
          40% { 
            transform: translate(-2px, -2px) skew(-2deg);
            text-shadow: -4px 0 #ff00ea;
          }
          60% { 
            transform: translate(2px, 2px) skew(0deg);
            text-shadow: 2px 0 #ff00ea;
          }
          80% { 
            transform: translate(2px, -2px) skew(2deg);
            text-shadow: -2px 0 #ff00ea;
          }
          100% { 
            transform: translate(0) skew(0deg);
            text-shadow: -2px 0 #ff00ea;
          }
        }

        @keyframes glitch-2 {
          0% { 
            transform: translate(0) skew(0deg);
            text-shadow: 2px 0 #00ffff;
            opacity: 0.8;
          }
          20% { 
            transform: translate(2px, -2px) skew(-2deg);
            text-shadow: -4px 0 #00ffff;
            opacity: 1;
          }
          40% { 
            transform: translate(2px, 2px) skew(2deg);
            text-shadow: 4px 0 #00ffff;
            opacity: 0.9;
          }
          60% { 
            transform: translate(-2px, -2px) skew(0deg);
            text-shadow: -2px 0 #00ffff;
            opacity: 1;
          }
          80% { 
            transform: translate(-2px, 2px) skew(-2deg);
            text-shadow: 2px 0 #00ffff;
            opacity: 0.8;
          }
          100% { 
            transform: translate(0) skew(0deg);
            text-shadow: 2px 0 #00ffff;
            opacity: 1;
          }
        }

        @keyframes cyber-pulse {
          0%, 100% { 
            box-shadow: 0 0 5px #00ff88,
                      0 0 10px #00ff88,
                      0 0 20px #00ff88,
                      0 0 40px #00ff88;
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 10px #00ffff,
                      0 0 20px #00ffff,
                      0 0 40px #00ffff,
                      0 0 80px #00ffff;
            transform: scale(1.02);
          }
        }

        @keyframes matrix-rain {
          0% {
            background-position: 0% -100%;
            opacity: 0.8;
          }
          100% {
            background-position: 0% 100%;
            opacity: 0.2;
          }
        }

        .animate-glitch-1 {
          animation: glitch-1 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
          mix-blend-mode: multiply;
        }

        .animate-glitch-2 {
          animation: glitch-2 0.3s cubic-bezier(.25, .46, .45, .94) reverse both infinite;
          mix-blend-mode: screen;
        }

        .cyber-grid {
          background-image: 
            linear-gradient(to right, rgba(0, 255, 136, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 136, 0.07) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(circle at 50% 50%, black, transparent);
          animation: matrix-rain 20s linear infinite;
        }

        .card-glow {
          position: relative;
        }

        .card-glow::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(90deg, #00ff88, #00ffff, #ff00ea, #00ff88);
          background-size: 400% 100%;
          animation: cyber-pulse 3s ease infinite;
          z-index: -1;
          filter: blur(8px);
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .card-glow:hover::before {
          opacity: 1;
        }
      `}</style>
    </motion.section>
  );
};
