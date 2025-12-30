import { useState, useEffect, useRef } from 'react';
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

export const SkillMatrix = ({ scrollY = 0 }: { scrollY?: number }) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const skillEntries = Object.entries(skills);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    // Observe each category section to update activeCategory on intersection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-category');
          if (!id) return;
          if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
            setActiveCategory(id);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: [0.45, 0.6] }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ensure there is an initial active category
  useEffect(() => {
    if (!activeCategory && skillEntries.length) setActiveCategory(skillEntries[0][0]);
  }, [activeCategory, skillEntries]);

  return (
    <section className="py-20 relative z-0 snap-y snap-mandatory md:snap-none">
      {/* Neural network background effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-10"></div>
      
      {/* Container with proper spacing for right sidebar */}
      <div className="container mx-auto px-4 md:pr-72 relative z-0">
        {/* Mobile fixed active header */}
        <div className="fixed left-0 right-0 top-14 z-40 px-4 md:hidden pointer-events-none">
          <div className="mx-auto max-w-[720px] pointer-events-auto">
            <HolographicCard
              className={`p-3 rounded-md bg-black/80 backdrop-blur-md border border-[#00ff88]/10 transition-all duration-200 ${activeCategory ? 'ring-2 ring-[#00ff88]/40 shadow-[0_0_14px_rgba(0,255,136,0.12)]' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded bg-[#001313]/50 border border-[#00ff88]/10">
                  {activeCategory && skills[activeCategory as keyof typeof skills]?.icon}
                </div>
                <div>
                  <div className="text-sm font-mono text-[#00ff88]">{activeCategory ?? ''}</div>
                  <div className="text-xs text-muted-foreground font-mono">{activeCategory ? `${Object.values(skills[activeCategory as keyof typeof skills].items).flat().length} capabilities loaded` : ''}</div>
                </div>
              </div>
            </HolographicCard>
          </div>
        </div>
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

        {/* Stacked Sections per category - use main page scroll, no internal scrollbars */}
        {skillEntries.map(([category, { icon, color, items }]) => (
          <section
            key={category}
            data-category={category}
            ref={(el) => (sectionRefs.current[category] = el)}
            className="relative min-h-screen snap-start"
          >
            <div className="flex flex-row items-start gap-6 lg:gap-16 py-12 px-2 sm:px-4">

              {/* LEFT - Sticky card pinned while this section is in view */}
              <div className="hidden md:block lg:w-1/3 flex-shrink-0">
                <div className="sticky top-24 self-start">
                  <HolographicCard className="p-6 lg:p-8 bg-black/80 backdrop-blur-md border-2 border-primary/30 hover:border-primary/50 transition-all duration-300">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-${color}/10 border border-${color}/30`}>
                          {icon}
                        </div>
                      </div>
                      <h3 className={`text-2xl lg:text-3xl font-cyber text-${color} leading-tight`}>
                        {category}
                      </h3>
                      <div className={`w-16 h-1 bg-gradient-to-r from-${color} to-transparent`}></div>
                      <p className="text-xs lg:text-sm text-muted-foreground font-matrix">
                        {Object.values(items).flat().length} capabilities loaded
                      </p>
                      <div className="flex items-center gap-2 pt-2">
                        <div className={`w-2 h-2 rounded-full bg-${color} animate-pulse`}></div>
                        <span className="text-xs text-primary/60 font-matrix">ACTIVE</span>
                      </div>
                    </div>
                  </HolographicCard>
                </div>
              </div>

              {/* For mobile: small left marker */}
              <div className="md:hidden w-12 flex-shrink-0 flex flex-col items-center pt-2">
                <div className={`w-8 h-8 rounded border border-[#00ff88]/10 ${activeCategory === category ? 'bg-[#002a20] ring-2 ring-[#00ff88]/40 shadow-[0_0_12px_rgba(0,255,136,0.12)]' : 'bg-transparent'}`}></div>
              </div>

              {/* RIGHT - Skill lists (grow naturally; no overflow or internal scroll) */}
              <div className="flex-1 min-w-0 lg:w-2/3" style={{ transform: `translateY(${scrollY * 0.06}px)` }}>
                <div className="space-y-12">
                  {Object.entries(items).map(([subCategory, skillList], subIndex) => (
                    <motion.div
                      key={subCategory}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: subIndex * 0.1 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`w-1 h-8 bg-gradient-to-b from-${color} to-transparent`}></div>
                        <h4 className="text-lg lg:text-xl font-matrix text-primary/90">{subCategory}</h4>
                        <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent"></div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-5">
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
                              className={`group relative w-full min-h-[44px] px-3 py-3 border rounded-lg font-mono text-sm transition-all duration-200 cursor-pointer flex items-center gap-3 justify-between
                                  ${hoveredSkill === skillName ? `border-[#00ff88] text-[#00ff88] bg-[#002a20]/60 shadow-[0_0_18px_rgba(0,255,136,0.12)] scale-[1.02]` : 'border-[#0b2c2a]/40 text-white/90 bg-black/20 backdrop-blur-sm hover:border-[#00ff88]/20 hover:bg-black/30'}`}
                                onMouseEnter={() => setHoveredSkill(skillName)}
                                onMouseLeave={() => setHoveredSkill(null)}
                                onTouchStart={() => setHoveredSkill(skillName)}
                                onTouchEnd={() => setHoveredSkill(null)}
                                role="button"
                                tabIndex={0}
                            >
                              {SkillIcon && (
                                <div className={`flex-shrink-0 transition-transform duration-300 ${hoveredSkill === skillName ? 'scale-110 rotate-12' : ''}`}>
                                  <SkillIcon className="w-5 h-5" />
                                </div>
                              )}

                              <span className="flex-1 leading-tight">{skillName}</span>

                              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${hoveredSkill === skillName ? `bg-${color} shadow-[0_0_8px_currentColor] scale-150` : 'bg-primary/30'}`}></div>

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
