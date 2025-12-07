import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../lib/animations';
import { Card } from './ui/card';
import { Parallax } from 'react-scroll-parallax';

interface Project {
  title: string;
  description: string;
  impact: string;
  techStack: string[];
  metrics: string[];
  link?: string;
}

export const ProjectShowcase = () => {
  const projects: Project[] = [
{
  "title": "Stock_Verse",
  "description": "Built a full-stack gamified platform teaching stock-market fundamentals through real-time data, quizzes, leaderboards, and an AI assistant. Uses React + TypeScript frontend and FastAPI backend proxying Yahoo Finance. A Flask chatbot powered by Gemini provides contextual trading insights.",
  "impact": "Boosted financial literacy and engagement with hands-on simulations and personalized AI guidance, achieving 3× higher retention.",
  "techStack": ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Chart.js", "FastAPI", "Flask", "Python", "Gemini API", "Yahoo Finance API", "pandas", "httpx", "Gunicorn", "Vercel", "Render"],
  "metrics": [
    "1,000+ simulated trading sessions",
    "Live Yahoo Finance proxy",
    "3× engagement uplift from gamified modules",
    "Production-safe fallbacks and CORS setup"
  ],
  "link": "https://stockver.vercel.app"
},
{
  "title": "PDF Policy Query System",
  "description": "Developed an AI-powered tool that converts complex policy PDFs into conversational answers using OCR, Weaviate vector search, and Gemini 2.5 Pro. Automates text extraction, chunking, and retrieval for clear, explainable responses.",
  "impact": "Simplified policy interpretation and decision-making by turning dense documents into concise, actionable insights.",
  "techStack": ["FastAPI", "Python", "PaddleOCR", "LangChain", "Weaviate", "Gemini 2.0 Flash", "text-embedding-004", "Docker", "React", "Node.js", "Redis", "PyMuPDF"],
  "metrics": [
    "Multi-engine OCR pipeline (PaddleOCR + Tesseract)",
    "Semantic chunking + Weaviate search",
    "Gemini-based single-answer generator",
    ],
  "link": "#"
},
{
  "title": "RAKSHA X – Safety & Support Platform",
  "description": "Created an AI-driven safety ecosystem integrating real-time sound detection, SOS alerts, and mental-health chat support. Combines YAMNet, Vosk, and Flask backend with Twilio for verified emergency messaging.",
  "impact": "Merged safety and emotional well-being through live sound intelligence, instant SOS response, and empathetic AI assistance.",
  "techStack": ["Flask", "Python", "TensorFlow", "TensorFlow Hub", "YAMNet", "Vosk", "Librosa", "Twilio API", "Gemini API", "HTML", "CSS", "JavaScript"],
  "metrics": [
    "Real-time audio classification (screams, gunshots, explosions)",
    "Automated SOS pipeline via Twilio",
    "4+ integrated safety modules – Detect, SOS, Game, Chatbot"
  ],
  "link": "#"
}


  ];

  return (
    <section className="min-h-screen bg-black py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <Parallax speed={-10}>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00ff88] to-[#00a6ff]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              My Projects
            </motion.h2>
          </Parallax>
          <Parallax speed={5}>
            <motion.p
              className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Blending AI, design, and code to solve impactful problems fast.
            </motion.p>
          </Parallax>
        </div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-1 sm:px-2 md:px-0" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          {projects.map((project, index) => (
            <Parallax key={index} speed={index % 2 === 0 ? -5 : 8}>
              <motion.div variants={fadeInUp} custom={index}>
                <a href={project.link || '#'} target="_blank" rel="noopener noreferrer" className="block ease-out-expo">
                <Card className="h-full bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-[#00ff88]/30 transition-all duration-300 will-change-transform">
                  <div className="p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col h-full card-hover">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 md:mb-4">{project.title}</h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4">{project.description}</p>
                  
                  <div className="mb-4 sm:mb-5 md:mb-6">
                    <h4 className="text-[#00ff88] font-semibold text-sm sm:text-base mb-1 sm:mb-2">Impact</h4>
                    <p className="text-white text-sm sm:text-base">{project.impact}</p>
                  </div>

                  <div className="mb-4 sm:mb-5 md:mb-6">
                    <h4 className="text-[#00ff88] font-semibold text-sm sm:text-base mb-1 sm:mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.techStack.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-2.5 sm:px-3 py-1 bg-gray-800 text-gray-200 rounded-full text-xs sm:text-sm text-glow-soft"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h4 className="text-[#00ff88] font-semibold text-sm sm:text-base mb-1 sm:mb-2">Key Metrics</h4>
                    <ul className="space-y-1 sm:space-y-2">
                      {project.metrics.map((metric, i) => (
                        <li key={i} className="text-gray-300 text-xs sm:text-sm flex items-start">
                          <span className="text-[#00ff88] mr-1.5 sm:mr-2 flex-shrink-0">•</span>
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  </div>
                </Card>
                </a>
              </motion.div>
            </Parallax>
          ))}
        </motion.div>
      </div>
    </section>
  );
};