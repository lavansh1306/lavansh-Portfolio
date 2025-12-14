import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, Database, Cloud, Lock, Cpu } from 'lucide-react';

// --- Data ---
const projects = [
  {
    id: "01",
    title: "Stock_Verse",
    cat: "Fintech",
    desc: "Real-time stock trading simulation using FastAPI proxies & Gemini AI.",
    tech: ["React", "Python", "Redis", "Gemini"],
    img: "from-emerald-900 to-slate-900",
    link: "#"
  },
  {
    id: "02",
    title: "PDF Query",
    cat: "RAG Pipeline",
    desc: "Converts dense legal PDFs into conversational insights via Vector Search.",
    tech: ["LangChain", "Weaviate", "Docker"],
    img: "from-blue-900 to-slate-900",
    link: "#"
  },
  {
    id: "03",
    title: "Raksha X",
    cat: "IoT Safety",
    desc: "Acoustic forensics system detecting gunshots & screams for SOS alerts.",
    tech: ["TensorFlow", "YAMNet", "Twilio"],
    img: "from-red-900 to-slate-900",
    link: "#"
  },
  {
    id: "04",
    title: "Neural_Net",
    cat: "WebGL Exp",
    desc: "Visualizing neural pathways using React Three Fiber and shaders.",
    tech: ["Three.js", "GLSL", "React"],
    img: "from-purple-900 to-slate-900",
    link: "#"
  },
];

// --- 3D Card Component ---
const Card = ({ project }: { project: typeof projects[0] }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ["15deg", "-15deg"]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-15deg", "15deg"]));

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative h-[450px] w-[350px] md:h-[550px] md:w-[450px] flex-shrink-0 rounded-3xl bg-gray-900/50 border border-white/10 cursor-pointer"
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.img} opacity-50 rounded-3xl group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Holographic Overlay */}
      <motion.div
        style={{
          transform: "translateZ(50px)",
          background: useMotionTemplate`radial-gradient(circle at ${x.get() * 100 + 50}% ${y.get() * 100 + 50}%, rgba(255,255,255,0.1), transparent 80%)`
        }}
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Content Layer (Floating) */}
      <div style={{ transform: "translateZ(60px)" }} className="absolute inset-0 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="text-4xl font-mono font-bold text-white/10">{project.id}</span>
          <div className="flex gap-2">
            <div className="p-2 bg-black/40 rounded-full backdrop-blur-md border border-white/10"><Github size={18} /></div>
            <div className="p-2 bg-black/40 rounded-full backdrop-blur-md border border-white/10"><ExternalLink size={18} /></div>
          </div>
        </div>

        <div>
           <div className="mb-4 inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium text-emerald-400">
             {project.cat}
           </div>
           <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
           <p className="text-gray-400 text-sm leading-relaxed mb-6">{project.desc}</p>
           <div className="flex flex-wrap gap-2">
             {project.tech.map((t, i) => (
               <span key={i} className="text-[10px] uppercase tracking-wider text-gray-400 border border-white/10 px-2 py-1 rounded bg-black/40">
                 {t}
               </span>
             ))}
           </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Scroll Section ---
export const ProjectShowcase = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map vertical scroll (0 to 1) to horizontal transform (-1% to -95%)
  // Adjust "-95%" based on how many cards you have.
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    // 1. THE HEIGHT TRICK: This div is 300vh tall (300% of screen).
    // The user has to scroll through all this height to finish the section.
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      
      {/* 2. THE STICKY CONTAINER: This stays locked at the top of the screen */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Background Grids/Decor */}
        <div className="absolute inset-0 z-0 opacity-30">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>

        {/* 3. THE HORIZONTAL MOVER: Moves Left as you Scroll Down */}
        <motion.div style={{ x }} className="flex gap-12 pl-12 md:pl-24 pr-12">
          
          {/* Title Card (First item seen) */}
          <div className="flex flex-col justify-center min-w-[300px] md:min-w-[400px]">
             <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
               Selected <br />
               <span className="text-emerald-400">Works</span>
             </h2>
             <p className="mt-6 text-gray-400 max-w-sm text-lg">
               Scroll down to explore the gallery. <br/>
               <span className="text-xs uppercase tracking-widest opacity-50">/// Drag or Scroll</span>
             </p>
          </div>

          {/* Project Cards */}
          {projects.map((project) => (
            <Card key={project.id} project={project} />
          ))}

          {/* "See More" Card at the end */}
          <div className="h-[450px] w-[200px] md:h-[550px] md:w-[300px] flex items-center justify-center flex-shrink-0 border-l border-white/10 ml-8">
            <a href="#" className="group flex flex-col items-center gap-4 text-white">
              <div className="p-4 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all">
                <ArrowRight size={32} />
              </div>
              <span className="font-mono text-sm tracking-widest uppercase">View All</span>
            </a>
          </div>

        </motion.div>

        {/* Progress Bar (Bottom) */}
        <div className="absolute bottom-10 left-12 right-12 h-1 bg-white/10 rounded-full overflow-hidden z-20">
          <motion.div 
            style={{ scaleX: scrollYProgress, transformOrigin: "0%" }} 
            className="h-full bg-emerald-400" 
          />
        </div>

      </div>
    </section>
  );
};