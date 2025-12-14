import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import { 
  ExternalLink, 
  Github, 
  Code2, 
  Terminal, 
  Cpu, 
  Database, 
  Activity, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { Card } from './ui/card'; // Assuming you have this, or use a div
import { cn } from '../lib/utils'; // Standard shadcn utility or simply define it

// --- Types ---
interface Project {
  title: string;
  description: string;
  impact: string;
  techStack: string[];
  metrics: string[];
  link?: string;
  github?: string;
}

// --- Helper: Icon Mapper ---
const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes('react') || t.includes('next')) return <Code2 className="w-3 h-3" />;
  if (t.includes('python') || t.includes('flask')) return <Terminal className="w-3 h-3" />;
  if (t.includes('data') || t.includes('sql') || t.includes('pandas')) return <Database className="w-3 h-3" />;
  if (t.includes('ai') || t.includes('gemini') || t.includes('tensor')) return <Cpu className="w-3 h-3" />;
  return <Zap className="w-3 h-3" />;
};

// --- Component: Spotlight Card ---
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative border border-white/10 bg-gray-900/50 overflow-hidden rounded-xl"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Effect Gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 255, 136, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative flex flex-col h-full p-6 sm:p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover:border-[#00ff88]/50 transition-colors">
            {index === 0 ? <Activity className="text-[#00ff88]" /> : 
             index === 1 ? <Database className="text-[#00a6ff]" /> : 
             <Cpu className="text-purple-400" />}
          </div>
          <div className="flex gap-2">
            {project.link && project.link !== '#' && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Live Demo">
                <ExternalLink size={20} />
              </a>
            )}
            {/* Assuming you might add Github links later, keeping logic ready */}
            <a href={project.github || '#'} className="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Github Repo">
              <Github size={20} />
            </a>
          </div>
        </div>

        {/* Title & Desc */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#00ff88] transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Impact Section (Highlighted) */}
        <div className="mb-6 bg-white/5 rounded-lg p-4 border-l-2 border-[#00ff88]">
          <h4 className="text-[#00ff88] text-xs font-bold uppercase tracking-wider mb-1">Impact</h4>
          <p className="text-gray-200 text-sm">{project.impact}</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-2 mb-6">
          {project.metrics.map((metric, i) => (
            <div key={i} className="flex items-center text-xs sm:text-sm text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00a6ff] mr-2 flex-shrink-0" />
              {metric}
            </div>
          ))}
        </div>

        {/* Footer: Tech Stack & Action */}
        <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 6).map((tech, i) => (
              <span 
                key={i} 
                className="inline-flex items-center px-2 py-1 rounded-md text-[10px] sm:text-xs font-medium bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20"
              >
                <span className="mr-1 opacity-70">{getTechIcon(tech)}</span>
                {tech}
              </span>
            ))}
            {project.techStack.length > 6 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] text-gray-500 border border-white/10">
                +{project.techStack.length - 6} more
              </span>
            )}
          </div>
          
          {project.link && project.link !== '#' && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2 bg-white/5 hover:bg-[#00ff88]/20 text-white text-sm font-medium rounded-lg border border-white/10 hover:border-[#00ff88]/50 transition-all group-hover:translate-x-1"
            >
              View Project <ArrowRight size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Section Component ---
export const ProjectShowcase = () => {
  const projects: Project[] = [
    {
      title: "Stock_Verse",
      description: "A gamified platform teaching stock-market fundamentals via real-time data & AI. Features a FastAPI proxy for Yahoo Finance and a Gemini-powered trading mentor.",
      impact: "Achieved 3× higher user retention through gamification and boosted financial literacy with personalized AI guidance.",
      techStack: ["React", "TypeScript", "FastAPI", "Python", "Gemini API", "Tailwind", "Vite", "Chart.js"],
      metrics: ["1,000+ simulated sessions", "Real-time Yahoo Finance proxy", "Production-ready CORS setup"],
      link: "https://stockver.vercel.app",
      github: "https://github.com/yourusername/stockverse" 
    },
    {
      title: "PDF Policy Query System",
      description: "AI tool converting complex policy PDFs into conversational answers. Uses OCR (PaddleOCR) and Vector Search (Weaviate) to handle dense documentation.",
      impact: "Reduces policy review time by turning dense legal documents into instant, actionable insights.",
      techStack: ["LangChain", "Weaviate", "Gemini 2.0", "PaddleOCR", "Docker", "Redis", "React"],
      metrics: ["Multi-engine OCR pipeline", "Semantic Chunking", "Sub-second retrieval latency"],
      link: "#",
      github: "#"
    },
    {
      title: "RAKSHA X",
      description: "Safety ecosystem integrating real-time sound detection (gunshots, screams) with SOS alerts. Merges physical safety monitoring with mental health chat support.",
      impact: "Bridged the gap between physical emergency response and emotional well-being using edge-AI sound analysis.",
      techStack: ["TensorFlow", "YAMNet", "Flask", "Twilio", "Vosk", "Librosa", "Gemini API"],
      metrics: ["Real-time audio classification", "Automated SMS/Call via Twilio", "Integrated Chatbot"],
      link: "https://github.com/lavansh1306/RAKSHA_X",
      github: "https://github.com/lavansh1306/RAKSHA_X"
    }
  ];

  return (
    <section className="relative min-h-screen bg-black py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background Decor - Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-24">
          <Parallax speed={-5}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 tracking-tight">
                Selected <span className="text-[#00ff88]">Work</span>
              </h2>
              <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-light">
                Blending <span className="text-white font-medium">AI intelligence</span> with 
                <span className="text-white font-medium"> modern design</span> to solve complex problems.
              </p>
            </motion.div>
          </Parallax>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <Parallax key={index} speed={index % 2 === 0 ? 0 : 5} className="h-full">
              <ProjectCard project={project} index={index} />
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
};