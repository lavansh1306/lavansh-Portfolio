import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../lib/animations';
import { Card } from './ui/card';

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
    "Full-stack Dockerized deployment"
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
    <section className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00ff88] to-[#00a6ff]">
            My Projects
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Blending AI, design, and code to solve impactful problems fast.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          {projects.map((project, index) => (
            <motion.div key={index} variants={fadeInUp} custom={index}>
              <Card className="h-full bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-[#00ff88]/30 transition-all duration-300">
                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-[#00ff88] font-semibold mb-2">Impact</h4>
                    <p className="text-white">{project.impact}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-[#00ff88] font-semibold mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h4 className="text-[#00ff88] font-semibold mb-2">Key Metrics</h4>
                    <ul className="space-y-2">
                      {project.metrics.map((metric, i) => (
                        <li key={i} className="text-gray-300 flex items-center">
                          <span className="text-[#00ff88] mr-2">•</span>
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};