import { useState } from 'react';
import { motion } from 'framer-motion';
import { HolographicCard } from './HolographicCard';
import { Brain, Code, Terminal } from 'lucide-react';
import { 
  SiPython, SiTypescript, SiJavascript, SiCplusplus, SiHtml5, SiCss3,
  SiReact, SiNextdotjs, SiTailwindcss,
  SiFlask, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql,
  SiDocker, SiKubernetes,
  SiGit, SiGithub,
  SiTensorflow, SiPytorch, SiScikitlearn,
  SiHuggingface, SiOpenai, SiGoogle,
  SiFigma, SiNotion, SiVercel
} from 'react-icons/si';
import { FaJava, FaRobot } from 'react-icons/fa';
import { RiDiscussLine, RiEyeLine, RiFileTextLine, RiSparklingFill, RiDatabase2Line } from 'react-icons/ri';
import { TbScan } from 'react-icons/tb';

// Type for skill with icon
interface SkillWithIcon {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const skills = {
  "Core": {
    icon: <Code className="text-neon-cyan" size={24} />,
    color: "neon-cyan",
    items: {
      "Languages": [
        { name: "Python", icon: SiPython },
        { name: "TypeScript", icon: SiTypescript },
        { name: "Java", icon: FaJava },
        { name: "C++", icon: SiCplusplus },
        { name: "JavaScript", icon: SiJavascript },
        { name: "HTML", icon: SiHtml5 },
        { name: "CSS", icon: SiCss3 }
      ] as SkillWithIcon[],
      "Frontend": [
        { name: "React", icon: SiReact },
        { name: "Next.js", icon: SiNextdotjs },
        { name: "Tailwind CSS", icon: SiTailwindcss }
      ] as SkillWithIcon[],
      "Backend": [
        { name: "Flask", icon: SiFlask },
        { name: "Node.js", icon: SiNodedotjs },
        { name: "Express", icon: SiExpress },
        { name: "MongoDB", icon: SiMongodb },
        { name: "PostgreSQL", icon: SiPostgresql }
      ] as SkillWithIcon[],
      "Cloud & DevOps": [
        { name: "Docker", icon: SiDocker },
        { name: "Kubernetes", icon: SiKubernetes }
      ] as SkillWithIcon[],
      "Version Control": [
        { name: "Git", icon: SiGit },
        { name: "GitHub", icon: SiGithub }
      ] as SkillWithIcon[]
    }
  },
  "Machine Learning & AI": {
    icon: <Brain className="text-neon-purple" size={24} />,
    color: "neon-purple",
    items: {
      "Frameworks": [
        { name: "TensorFlow", icon: SiTensorflow },
        { name: "PyTorch", icon: SiPytorch },
        { name: "Scikit-learn", icon: SiScikitlearn }
      ] as SkillWithIcon[],
      "Libraries": [
        { name: "Transformers (Hugging Face)", icon: SiHuggingface },
        { name: "SentenceTransformers", icon: FaRobot }
      ] as SkillWithIcon[],
      "Areas": [
        { name: "Natural Language Processing (NLP)", icon: RiDiscussLine },
        { name: "Computer Vision", icon: RiEyeLine },
        { name: "OCR (PaddleOCR, TrOCR)", icon: TbScan },
        { name: "Retrieval Augmented Generation (RAG)", icon: RiDatabase2Line }
      ] as SkillWithIcon[],
      "APIs & Models": [
        { name: "OpenAI API", icon: SiOpenai },
        { name: "Gemini API", icon: RiSparklingFill }
      ] as SkillWithIcon[]
    }
  },
  "Tools & Platforms": {
    icon: <Terminal className="text-neon-green" size={24} />,
    color: "neon-green",
    items: {
      "Collaboration": [
        { name: "Figma", icon: SiFigma },
        { name: "Notion", icon: SiNotion }
      ] as SkillWithIcon[],
      "Databases": [
        { name: "MongoDB", icon: SiMongodb },
        { name: "PostgreSQL", icon: SiPostgresql }
      ] as SkillWithIcon[],
      "Deployment": [
        { name: "Vercel", icon: SiVercel }
      ] as SkillWithIcon[]
    }
  }
};

export const SkillMatrix = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const skillEntries = Object.entries(skills);

  return (
    <section className="py-20 relative z-0">
      {/* Neural network background effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-10"></div>
      
      {/* Container - NO PADDING ON RIGHT, let sections handle it */}
      <div className="container mx-auto px-4 relative z-0">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cyber text-primary animate-neon-pulse mb-4">
            NEURAL SKILLSET
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-gradient-neon mx-auto"></div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mt-4 md:mt-6 font-matrix">
            Combat-ready tech arsenal. Maximum efficiency.
          </p>
        </div>

        {/* Stacked Sections per category - EXACT SAME LAYOUT ON MOBILE & DESKTOP */}
        {skillEntries.map(([category, { icon, color, items }]) => (
          <section key={category} className="relative min-h-screen">
            {/* LEFT + RIGHT SIDE-BY-SIDE ON ALL SCREENS */}
            <div className="flex flex-row gap-6 lg:gap-16 py-12 pr-2 sm:pr-4 md:pr-72">

              {/* LEFT - Sticky card pinned (ALWAYS 25% width) */}
              <div className="w-1/4 sm:w-1/3 flex-shrink-0">
                <div className="sticky top-24 self-start">
                  <HolographicCard className="p-3 sm:p-4 md:p-6 lg:p-8 bg-black/80 backdrop-blur-md border-2 border-primary/30 hover:border-primary/50 transition-all duration-300">
                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                        <div className={`p-2 sm:p-2.5 md:p-3 rounded-lg bg-${color}/10 border border-${color}/30`}>
                          {icon}
                        </div>
                      </div>
                      <h3 className={`text-sm sm:text-lg md:text-2xl lg:text-3xl font-cyber text-${color} leading-tight`}>
                        {category}
                      </h3>
                      <div className={`w-12 sm:w-14 md:w-16 h-1 bg-gradient-to-r from-${color} to-transparent`}></div>
                      <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-matrix">
                        {Object.values(items).flat().length} capabilities loaded
                      </p>
                      <div className="flex items-center gap-2 pt-1 sm:pt-2 md:pt-2">
                        <div className={`w-2 h-2 rounded-full bg-${color} animate-pulse`}></div>
                        <span className="text-[10px] sm:text-xs text-primary/60 font-matrix">ACTIVE</span>
                      </div>
                    </div>
                  </HolographicCard>
                </div>
              </div>

              {/* RIGHT - Skill lists (ALWAYS 75% width) */}
              <div className="w-3/4 sm:w-2/3">
                <div className="space-y-8 sm:space-y-10 md:space-y-12">
                  {Object.entries(items).map(([subCategory, skillList], subIndex) => (
                    <motion.div
                      key={subCategory}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: subIndex * 0.1 }}
                      className="space-y-4 sm:space-y-5 md:space-y-6"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
                        <div className={`w-1 h-6 sm:h-7 md:h-8 bg-gradient-to-b from-${color} to-transparent`}></div>
                        <h4 className="text-xs sm:text-sm md:text-lg lg:text-xl font-matrix text-primary/90">{subCategory}</h4>
                        <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent"></div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
                        {skillList.map((skill, skillIndex) => {
                          const skillName = typeof skill === 'string' ? skill : skill.name;
                          const SkillIcon = typeof skill === 'string' ? null : skill.icon;

                          return (
                            <motion.div
                              key={skillName}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                              className={`group relative px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 border rounded-lg font-matrix text-[11px] sm:text-xs md:text-sm transition-all duration-300 cursor-pointer flex items-center gap-1.5 sm:gap-2 md:gap-3
                                ${hoveredSkill === skillName ? `border-${color} text-${color} bg-${color}/10 shadow-[0_0_20px_rgba(0,255,136,0.3)] scale-[1.02]` : 'border-primary/20 text-white/90 hover:border-primary/50 bg-black/30 backdrop-blur-sm hover:bg-black/40'}`}
                              onMouseEnter={() => setHoveredSkill(skillName)}
                              onMouseLeave={() => setHoveredSkill(null)}
                              whileHover={{ x: 6 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {SkillIcon && (
                                <div className={`flex-shrink-0 transition-transform duration-300 ${hoveredSkill === skillName ? 'scale-110 rotate-12' : ''}`}>
                                  <SkillIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                                </div>
                              )}

                              <span className="flex-1 leading-tight line-clamp-1">{skillName}</span>

                              <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-all duration-300 flex-shrink-0 ${hoveredSkill === skillName ? `bg-${color} shadow-[0_0_8px_currentColor] scale-150` : 'bg-primary/30'}`}></div>

                              {hoveredSkill === skillName && (
                                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${color}/5 to-transparent rounded-lg pointer-events-none`}></div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </section>
        ))}

        {/* Matrix Effect */}
        <div className="absolute inset-0 pointer-events-none z-0">
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
