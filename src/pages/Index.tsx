import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MainHero } from "../components/MainHero";
import { ProjectShowcase } from "../components/ProjectShowcase";
import { AchievementShowcase } from "../components/AchievementShowcase";
import { SkillMatrix } from "../components/SkillMatrix";
import { BootSequence } from "../components/BootSequence";
import { CyberGrid } from "../components/CyberGrid";
import InternshipTimeline from "@/components/InternshipTimeline";
import { HolographicNav } from "../components/HolographicNav";
import { NeuralBridge } from "../components/NeuralBridge";
import RevealOnScroll from "../components/animations/RevealOnScroll";
import { StackedSection } from "../components/StackedSection";

const IndexPage = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [isTerminalHovered, setIsTerminalHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  /* Track which section is active for pointer-events control */
  const [activeSectionId, setActiveSectionId] = useState('intro');

  useEffect(() => {
    let rafId: number;
    let resizeTimeoutId: NodeJS.Timeout;

    const updateActiveSection = () => {
      /* Determine which section is currently active using viewport intersection.
         A section is ACTIVE if its vertical center intersects with viewport center.
         This prevents flickering and is more reliable than scroll-percentage logic. */
      const sections = document.querySelectorAll('[data-stacked-section]');
      const viewportCenter = window.innerHeight / 2;
      let active = 'intro';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        /* Section is active if it spans across the viewport center.
           rect.top <= viewportCenter: section's top is above center
           rect.bottom >= viewportCenter: section's bottom is below center */
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          active = section.id || 'intro';
        }
      });

      setActiveSectionId((prev) => {
        if (prev !== active) {
          return active;
        }
        return prev;
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
      /* Update active section on scroll */
      updateActiveSection();
    };

    const handleResize = () => {
      /* Debounce resize to avoid excessive updates */
      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(updateActiveSection, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    /* Initial update */
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeoutId);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isBooted) {
    return <BootSequence onComplete={() => setIsBooted(true)} />;
  }

  return (
    <div className="bg-black min-h-screen relative">
      <HolographicNav />
      <CyberGrid />
      <div className="relative z-10 pt-16 md:pt-0 pb-20 md:pb-0 w-full md:pr-64 px-4 md:px-0">
        {/* Section 1: Intro */}
        <StackedSection
          id="intro"
          active={activeSectionId === 'intro'}
          className="min-h-screen relative"
          style={{
            y: scrollY * 0.2,
            opacity: Math.max(0, 1 - scrollY / 2000),
            scale: 1 - (scrollY / 10000) * 0.1,
          }}
        >
          <MainHero />
        </StackedSection>

        {/* Depth spacer */}
        <div className="h-40" />

        {/* Section 2: Skills */}
        <RevealOnScroll>
          <StackedSection
            id="skills"
            active={activeSectionId === 'skills'}
            className="relative"
            style={{
              y: scrollY * 0.15,
              scale: 1 - (Math.max(0, scrollY - 1000) / 10000) * 0.1,
            }}
          >
            <SkillMatrix />
          </StackedSection>
        </RevealOnScroll>

        <div className="h-40" />

        {/* Section 3: Internship Experience */}
        <RevealOnScroll>
          <StackedSection
            id="internship"
            active={activeSectionId === 'internship'}
            className="relative"
            style={{
              y: scrollY * 0.1,
              scale: 1 - (Math.max(0, scrollY - 2000) / 10000) * 0.1,
            }}
          >
            <div className="text-center mb-8 px-4">
              <motion.h2
                className="font-mono font-bold tracking-wider mb-3 text-[3rem] sm:text-[3.5rem] md:text-[4rem] text-neon"
                style={{ textShadow: '0 0 12px rgba(0,255,136,0.14)' }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                INTERNSHIP EXPERIENCE
              </motion.h2>

              <motion.div
                className="w-40 h-1 bg-gradient-to-r from-transparent via-neon to-transparent mx-auto rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                style={{ boxShadow: '0 6px 18px rgba(0,255,136,0.16)' }}
              />
            </div>

            <InternshipTimeline />
          </StackedSection>
        </RevealOnScroll>

        <div className="h-40" />

        {/* Section 4: Projects */}
        <RevealOnScroll>
          <StackedSection
            id="projects"
            active={activeSectionId === 'projects'}
            className="relative"
            style={{
              y: scrollY * 0.05,
              scale: 1 - (Math.max(0, scrollY - 3000) / 10000) * 0.1,
            }}
          >
            <ProjectShowcase />
          </StackedSection>
        </RevealOnScroll>

        <div className="h-40" />

        {/* Section 5: Achievements */}
        <RevealOnScroll>
          <StackedSection
            id="achievements"
            active={activeSectionId === 'achievements'}
            className="relative"
          >
            <AchievementShowcase />
          </StackedSection>
        </RevealOnScroll>

        <div className="h-40" />

        {/* Section 6: Contact */}
        <RevealOnScroll>
          <StackedSection
            id="contact"
            active={activeSectionId === 'contact'}
            className="relative"
          >
            <NeuralBridge />
          </StackedSection>
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
