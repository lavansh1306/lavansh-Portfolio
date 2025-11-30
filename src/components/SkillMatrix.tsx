import { useState } from 'react';
import { motion } from 'framer-motion';
import { HolographicCard } from './HolographicCard';
import { Brain, Code, Cloud, Database, Terminal, Cpu, Radio } from 'lucide-react';

const skills = {
  "Core": {
    icon: <Code className="text-neon-cyan" size={24} />,
    color: "neon-cyan",
    items: {
      "Languages": ["Python", "TypeScript", "Java", "C++", "JavaScript", "HTML", "CSS"],
      "Frontend": ["React", "Next.js", "Tailwind CSS"],
      "Backend": ["Flask", "Node.js", "Express", "MongoDB", "PostgreSQL"],
      "Cloud & DevOps": ["Docker", "Kubernetes"],
      "Version Control": ["Git", "GitHub"]
    }
  },
  "Machine Learning & AI": {
    icon: <Brain className="text-neon-purple" size={24} />,
    color: "neon-purple",
    items: {
      "Frameworks": ["TensorFlow", "PyTorch", "Scikit-learn"],
      "Libraries": ["Transformers (Hugging Face)", "SentenceTransformers"],
      "Areas": [
        "Natural Language Processing (NLP)",
        "Computer Vision",
        "OCR (PaddleOCR, TrOCR)",
        "Retrieval Augmented Generation (RAG)"
      ],
      "APIs & Models": ["OpenAI API", "Gemini API"]
    }
  },
  "Tools & Platforms": {
    icon: <Terminal className="text-neon-green" size={24} />,
    color: "neon-green",
    items: {
      "Collaboration": ["Figma", "Notion"],
      "Databases": ["MongoDB", "PostgreSQL"],
      "Deployment": ["Vercel"]
    }
  }
};

export const SkillMatrix = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section className="py-20 relative">
      {/* Neural network background effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cyber text-primary animate-neon-pulse mb-4">
            NEURAL SKILLSET
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-gradient-neon mx-auto"></div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mt-4 md:mt-6 font-matrix">
            Combat-ready tech arsenal. Maximum efficiency.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 gap-8">
          {Object.entries(skills).map(([category, { icon, color, items }]) => (
            <HolographicCard 
              key={category}
              className="p-8 hover:shadow-[0_0_30px_rgba(0,255,136,0.2)] transition-shadow duration-300 ease-out-expo"
              onClick={() => setActiveCategory(activeCategory === category ? null : category)}
            >
              <div className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center gap-4">
                  {icon}
                  <h3 className={`text-2xl font-cyber text-${color}`}>{category}</h3>
                </div>

                {/* Skills Content */}
                <motion.div 
                  initial={false}
                  animate={{ height: activeCategory === category ? "auto" : "0" }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-6 py-4">
                    {Object.entries(items).map(([subCategory, skillList]) => (
                      <div key={subCategory} className="space-y-3">
                        <h4 className="text-lg font-matrix text-foreground">{subCategory}</h4>
                        <div className="flex flex-wrap gap-3">
                          {skillList.map((skill) => (
                            <motion.div
                              key={skill}
                              className={`px-3.5 py-2 border rounded-md font-matrix text-sm transition-colors cursor-pointer shadow-[0_0_8px_rgba(120,160,255,0.15)] card-hover
                                ${hoveredSkill === skill 
                                  ? `border-${color} text-${color} bg-${color}/10`
                                  : 'border-primary/30 text-white/90 hover:border-primary'
                                }`}
                              onMouseEnter={() => setHoveredSkill(skill)}
                              onMouseLeave={() => setHoveredSkill(null)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {skill}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Interactive Elements */}
                <div className="flex justify-between items-center pt-4 border-t border-primary/10">
                  <div className="text-sm font-matrix text-primary/60">
                    {Object.values(items).flat().length} capabilities
                  </div>
                  <motion.div 
                    animate={{ rotate: activeCategory === category ? 180 : 0 }}
                    className={`w-6 h-6 border border-${color}/30 rounded-full flex items-center justify-center`}
                  >
                    <span className={`text-${color}`}>⌄</span>
                  </motion.div>
                </div>
              </div>
            </HolographicCard>
          ))}
        </div>

        {/* Matrix Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-20 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3,
                animation: `matrix-rain ${2 + Math.random() * 4}s linear infinite`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
