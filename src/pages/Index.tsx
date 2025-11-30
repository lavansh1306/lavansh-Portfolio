import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MainHero } from "../components/MainHero";
import { ProjectShowcase } from "../components/ProjectShowcase";
import { AchievementShowcase } from "../components/AchievementShowcase";
import { SkillMatrix } from "../components/SkillMatrix";
import { BootSequence } from "../components/BootSequence";
import { CyberGrid } from "../components/CyberGrid";
import { InternshipShowcase } from "../components/InternshipShowcase";
import { HolographicNav } from "../components/HolographicNav";
import { NeuralBridge } from "../components/NeuralBridge";
import RevealOnScroll from "../components/animations/RevealOnScroll";
// ScrollShowcase removed (unused placeholder)

const IndexPage = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [isTerminalHovered, setIsTerminalHovered] = useState(false);

  if (!isBooted) {
    return <BootSequence onComplete={() => setIsBooted(true)} />;
  }

  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      <HolographicNav />
      <CyberGrid />
      <div className="relative z-10 pt-16 md:pt-0 pb-20 md:pb-0 w-full md:pr-64 px-4 md:px-0">
        <section id="intro" className="min-h-screen">
          <MainHero />
        </section>
        <RevealOnScroll>
          <section id="skills">
            <SkillMatrix />
          </section>
        </RevealOnScroll>
        <RevealOnScroll>
          <section id="internship">
            <InternshipShowcase />
          </section>
        </RevealOnScroll>
        <RevealOnScroll>
          <section id="projects">
            <ProjectShowcase />
          </section>
        </RevealOnScroll>
        <RevealOnScroll>
          <section id="achievements">
            <AchievementShowcase />
          </section>
        </RevealOnScroll>
        <RevealOnScroll>
          <section id="contact">
            <NeuralBridge />
          </section>
        </RevealOnScroll>

        {/* ScrollTrigger demo section removed */}
      </div>
      {/* Console Toggle Button - Desktop: Top-Left */}
      <div className="fixed top-8 left-8 z-50 pointer-events-auto hidden md:block">
        <Link to="/terminal/launch">
          <motion.div
            className="relative"
            onHoverStart={() => setIsTerminalHovered(true)}
            onHoverEnd={() => setIsTerminalHovered(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Tooltip */}
            <AnimatePresence>
              {isTerminalHovered && (
                <motion.div
                  className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 bg-black/90 border border-[#00ff41]/50 text-[#00ff41] text-sm font-mono pointer-events-none"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -10, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  System Override
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#00ff41]/50"></div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Console Toggle Button */}
            <button 
              className={`w-12 h-12 bg-black/80 backdrop-blur-sm border border-[#00ff41] flex items-center justify-center transition-all duration-300 ${
                isTerminalHovered 
                  ? 'bg-[#00ff41] text-black shadow-[0_0_15px_rgba(0,255,65,0.6)]' 
                  : 'text-[#00ff41]'
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
          </motion.div>
        </Link>
      </div>

      {/* Mobile: Terminal button in top-right (shifted left for hamburger) */}
      <div className="fixed top-6 right-16 z-50 pointer-events-auto md:hidden">
        <Link to="/terminal/launch">
          <motion.button
            className="w-10 h-10 bg-black/80 backdrop-blur-sm border border-[#00ff41] text-[#00ff41] flex items-center justify-center transition-all duration-300 hover:bg-[#00ff41] hover:text-black hover:shadow-[0_0_15px_rgba(0,255,65,0.6)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Launch Terminal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </motion.button>
        </Link>
      </div>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 cyber-scan"></div>
      </div>
    </div>
  );
};

// Make sure to export the component as default
export default IndexPage;
