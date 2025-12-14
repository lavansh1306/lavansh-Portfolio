import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus, Terminal, Cpu, ShieldCheck } from 'lucide-react';

// --- Data ---
const projects = [
  {
    id: "01",
    title: "STOCK_VERSE",
    category: "FINTECH / GAMIFICATION",
    description: "Full-stack platform gamifying stock-market education via real-time data proxies and AI mentorship.",
    tech: ["React", "FastAPI", "Gemini API", "Python", "Redis"],
    stats: [
      { label: "LATENCY", value: "120ms" },
      { label: "USERS", value: "1K+" },
      { label: "RETENTION", value: "+300%" }
    ],
    link: "https://stockver.vercel.app"
  },
  {
    id: "02",
    title: "PDF_QUERY_SYS",
    category: "RAG / DOCUMENT_AI",
    description: "Automated pipeline converting dense policy PDFs into conversational insights using vector search.",
    tech: ["LangChain", "Weaviate", "Docker", "PaddleOCR", "Next.js"],
    stats: [
      { label: "ACCURACY", value: "98.5%" },
      { label: "PIPELINE", value: "OCR+VEC" },
      { label: "MODEL", value: "GEMINI 2.0" }
    ],
    link: "#"
  },
  {
    id: "03",
    title: "RAKSHA_X",
    category: "IOT / SAFETY_OPS",
    description: "Real-time acoustic forensics system detecting gunshots/screams coupled with automated SOS pipelines.",
    tech: ["TensorFlow", "YAMNet", "Twilio", "Flask", "Edge AI"],
    stats: [
      { label: "DETECTION", value: "< 2s" },
      { label: "MODULES", value: "4" },
      { label: "STATUS", value: "LIVE" }
    ],
    link: "https://github.com/lavansh1306/RAKSHA_X"
  }
];

export const ProjectShowcase = () => {
  const [activeId, setActiveId] = useState<string | null>(projects[0].id);

  return (
    <section className="min-h-screen bg-[#050505] text-[#e1e1e1] font-mono py-24 px-4 sm:px-6 relative border-t border-white/10">
      
      {/* Background Grid - The "Blueprint" Look */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header - Industrial Style */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-2 border-white/20 pb-6">
          <div>
            <span className="text-xs text-[#00ff88] tracking-widest mb-2 block">/// SYSTEM_LOG: PROJECTS</span>
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
              Build<span className="text-white/20">_</span>Manifest
            </h2>
          </div>
          <div className="text-right mt-6 md:mt-0">
            <p className="text-xs text-gray-500 mb-1">DEPLOYMENT_REGION: IND</p>
            <p className="text-xs text-gray-500">LAST_UPDATE: 2025-Q1</p>
          </div>
        </div>

        {/* The List */}
        <div className="flex flex-col">
          {projects.map((project) => (
            <ProjectItem 
              key={project.id} 
              project={project} 
              isOpen={activeId === project.id} 
              onClick={() => setActiveId(activeId === project.id ? null : project.id)} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

const ProjectItem = ({ project, isOpen, onClick }: { project: any, isOpen: boolean, onClick: () => void }) => {
  return (
    <div 
      onClick={onClick}
      className={`group border-b border-white/10 cursor-pointer transition-colors duration-300 ${isOpen ? 'bg-white/5' : 'hover:bg-white/5'}`}
    >
      {/* Top Bar (Always Visible) */}
      <div className="py-6 sm:py-8 flex items-center justify-between px-2 sm:px-4">
        <div className="flex items-center gap-4 sm:gap-8">
          <span className={`text-xl font-bold font-mono transition-colors ${isOpen ? 'text-[#00ff88]' : 'text-gray-600'}`}>
            {project.id}
          </span>
          <h3 className="text-xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight">
            {project.title}
          </h3>
        </div>

        <div className="flex items-center gap-4 sm:gap-8">
          <span className="hidden sm:block text-xs text-gray-500 tracking-widest uppercase">
            {project.category}
          </span>
          <div className={`p-2 border border-white/20 transition-all duration-300 ${isOpen ? 'bg-[#00ff88] text-black rotate-180' : ''}`}>
            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
          </div>
        </div>
      </div>

      {/* Expanded Content (The "Tech Sheet") */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Bezier for robotic slide
            className="overflow-hidden"
          >
            <div className="px-4 pb-10 pt-2 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              
              {/* Description Column */}
              <div className="md:col-span-6 lg:col-span-5 text-gray-400 text-sm sm:text-base leading-relaxed border-l border-[#00ff88] pl-6">
                <p className="mb-6">{project.description}</p>
                <a 
                  href={project.link}
                  target="_blank" 
                  className="inline-flex items-center gap-2 text-[#00ff88] font-bold uppercase text-xs tracking-widest hover:underline"
                >
                  [ Initialize_Demo ] <ArrowUpRight size={14} />
                </a>
              </div>

              {/* Tech Stack Matrix */}
              <div className="md:col-span-3 lg:col-span-4">
                <span className="block text-xs text-gray-600 mb-4">/// DEPENDENCIES</span>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t: string, i: number) => (
                    <span key={i} className="px-2 py-1 bg-white/10 text-xs border border-white/5 text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="md:col-span-3">
                <span className="block text-xs text-gray-600 mb-4">/// TELEMETRY</span>
                <div className="space-y-3">
                  {project.stats.map((stat: any, i: number) => (
                    <div key={i} className="flex justify-between items-center border-b border-gray-800 pb-1">
                      <span className="text-[10px] text-gray-500">{stat.label}</span>
                      <span className="text-sm font-mono text-white">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};