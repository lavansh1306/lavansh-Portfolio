import { useState } from "react";
import { Link } from "react-router-dom";
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
import RevealOnScroll from "../components/animations/RevealOnScroll";
// ScrollShowcase removed (unused placeholder)

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
      {/* Floating Terminal button */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
        <Link to="/terminal/launch">
          <button className="bg-green-400 hover:bg-green-500 text-black font-semibold py-2 px-4 rounded-md shadow-lg">
            Open Terminal
          </button>
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
