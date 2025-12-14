import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  ArrowUpRight, 
  Zap,
  Box,
  Shield,
  Code
} from 'lucide-react';

// --- Data ---
const projects = [
  {
    id: 1,
    title: "Stock_Verse",
    subtitle: "Fintech Simulation Engine",
    description: "Real-time trading ecosystem handling 1000+ concurrent users. Features a Gemini-powered AI analyst that creates personalized trading strategies based on market volatility.",
    tags: ["FastAPI", "React", "Gemini AI", "Redis"],
    stats: "300% Engagement Boost",
    links: { demo: "https://stockver.vercel.app", repo: "#" },
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    icon: <Zap className="text-emerald-400" />,
    colSpan: "md:col-span-2", // This card takes 2 columns
  },
  {
    id: 2,
    title: "PDF Policy Query",
    subtitle: "RAG Pipeline",
    description: "Semantic search engine for legal docs. Reduced compliance review time by 90% using Weaviate vector retrieval.",
    tags: ["LangChain", "Weaviate", "Next.js"],
    stats: "90% Time Saved",
    links: { demo: "#", repo: "#" },
    gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
    icon: <Box className="text-blue-400" />,
    colSpan: "md:col-span-1", // This card takes 1 column
  },
  {
    id: 3,
    title: "RAKSHA X",
    subtitle: "IoT Acoustic Forensics",
    description: "Edge-AI safety system detecting distress signals (gunshots, screams) with <2s latency and 94% accuracy.",
    tags: ["TensorFlow", "Edge AI", "Twilio"],
    stats: "<2s Latency",
    links: { demo: "#", repo: "https://github.com/lavansh1306/RAKSHA_X" },
    gradient: "from-red-500/20 via-red-500/5 to-transparent",
    icon: <Shield className="text-red-400" />,
    colSpan: "md:col-span-1", // This card takes 1 column
  },
  {
    // Added a 4th "Placeholder" or "Coming Soon" card to balance the grid visually
    id: 4,
    title: "System_Architecture",
    subtitle: "DevOps & Cloud",
    description: "Ongoing research into scalable microservices patterns and kubernetes orchestration.",
    tags: ["AWS", "Docker", "K8s"],
    stats: "In Progress",
    links: { demo: "#", repo: "#" },
    gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
    icon: <Code className="text-purple-400" />,
    colSpan: "md:col-span-2", 
  }
];

// --- Components ---

const CardButton = ({ href, icon: Icon }: { href: string; icon: any }) => (
  <a 
    href={href}
    target="_blank"
    className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 hover:border-white/20"
  >
    <Icon size={16} />
  </a>
);

export const ProjectShowcase = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#050505] py-24 px-4 sm:px-6 relative overflow-hidden">
      
      {/* 1. Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* 2. Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Selected <span className="text-white/40">Work</span>
            </h2>
            <p className="text-gray-400 max-w-md text-sm md:text-base leading-relaxed">
              A collection of engineering problems I've solved, ranging from fintech simulations to edge-AI safety systems.
            </p>
          </div>
          <div className="hidden md:block">
            <a href="#" className="text-sm font-mono text-white/50 hover:text-white transition-colors flex items-center gap-2">
              VIEW GITHUB <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* 3. The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative rounded-3xl bg-[#0a0a0a] border border-white/10 overflow-hidden flex flex-col ${project.colSpan}`}
            >
              
              {/* Hover Gradient Glow */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
              />
              
              {/* Inner Content Wrapper */}
              <div className="relative h-full p-8 flex flex-col justify-between z-10">
                
                {/* Top Section */}
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                      {project.icon}
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <CardButton href={project.links.repo} icon={Github} />
                      <CardButton href={project.links.demo} icon={ExternalLink} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">{project.subtitle}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Section */}
                <div className="mt-auto">
                  {/* Stats Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-emerald-400 font-medium mb-4">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    {project.stats}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs text-gray-500 font-mono">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectShowcase;