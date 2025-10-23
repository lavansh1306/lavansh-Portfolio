import { useState } from "react";
import { motion } from "framer-motion";
import { MainHero } from "../components/MainHero";
import { ProjectShowcase } from "../components/ProjectShowcase";
import { AchievementShowcase } from "../components/AchievementShowcase";
import { SkillMatrix } from "../components/SkillMatrix";
import { BootSequence } from "../components/BootSequence";
import { CyberGrid } from "../components/CyberGrid";
import { InternshipShowcase } from "../components/InternshipShowcase";
import { HolographicNav } from "../components/HolographicNav";
import { NeuralBridge } from "../components/NeuralBridge";

const IndexPage = () => {
  const [isBooted, setIsBooted] = useState(false);

  if (!isBooted) {
    return <BootSequence onComplete={() => setIsBooted(true)} />;
  }

  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      <HolographicNav />
      <CyberGrid />
      <div className="relative z-10 pb-20 md:pb-0 md:pr-64">
        <section id="intro" className="min-h-screen">
          <MainHero />
        </section>
        <motion.section
          id="skills"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <SkillMatrix />
        </motion.section>
        <motion.section
          id="internship"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <InternshipShowcase />
        </motion.section>
        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <ProjectShowcase />
        </motion.section>
        <motion.section
          id="achievements"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <AchievementShowcase />
        </motion.section>
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <NeuralBridge />
        </motion.section>
      </div>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 cyber-scan"></div>
      </div>
    </div>
  );
};

// Make sure to export the component as default
export default IndexPage;
