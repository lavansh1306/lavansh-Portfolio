import React, { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ParticleFieldSmall from './ParticleFieldSmall';
import HorizontalScroller from './animations/HorizontalScroller';

export const AchievementShowcase = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(headerRef, { amount: 'some', once: true });
  const achievements = [
    {
  type: "hackathon",
  name: "GeoNova Hackathon 2025 (SRM Easwari Engineering College)",
  position: "Winner",
  prize: "—",
  description: "Developed HydroSense — an AI-based smart water management system using IoT to monitor consumption, detect leaks, and optimize water flow for sustainable living.",
  tech: ["Python", "IoT", "TensorFlow", "Flask"],
  image: "/achievements/geonova.png",
  link: "https://www.linkedin.com/posts/aakarsh-kumar25_%F0%9D%97%AA%F0%9D%97%B6%F0%9D%97%BB%F0%9D%97%BB%F0%9D%97%B2%F0%9D%97%BF%F0%9D%98%80-%F0%9D%97%BC%F0%9D%97%B3-%F0%9D%97%9A%F0%9D%97%B2%F0%9D%97%BC%F0%9D%97%A1%F0%9D%97%BC%F0%9D%98%83%F0%9D%97%AE%F0%9D%9F%AE%F0%9D%9F%B1-ugcPost-7314327913577738242-dT59?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE_JHoMBDGQ2FfJepNd7G5lBWyKXQ9UbkVA"
},
{
  type: "hackathon",
  name: "HackPick 2025 (Altruisty Innovations x SRM IST Career Centre)",
  position: "2nd Place",
  prize: "—",
  description: "Built Emulsify, a high-performance real-time data processing & visualization platform enabling fast analytics and decision-making.",
  tech: ["RAG", "GEMINI", "Weavieate", "React"],
  image: "/achievements/hackpick.png",
  link: "https://www.linkedin.com/posts/paridhi-babel-39105033a_24-hours-one-idea-endless-coffee-ugcPost-7360613015026606081-CbOO?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE_JHoMBDGQ2FfJepNd7G5lBWyKXQ9UbkVA"
},
{
  type: "hackathon",
  name: "Producting101 Hackathon 2025",
  position: "2nd Place",
  prize: "—",
  description: "Created Connectfy — an AI-powered networking app for events, matching attendees based on interests to enable smarter professional connections.",
  tech: ["React", "Flask", "NCL" , "NLP"],
  image: "/achievements/connectfy.png",
  link: "https://www.linkedin.com/posts/lavansh-choubey-683355314_hackathon-producting101-networkingrevolution-activity-7304886181022842880-opqB?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE_JHoMBDGQ2FfJepNd7G5lBWyKXQ9UbkVA"
},
{
  type: "hackathon",
  name: "Gender-Inclusive Future Hackathon (SRM IST)",
  position: "2nd Runners-Up",
  prize: "—",
  description: "Built B-Break, an AI chatbot supporting individuals facing gender discrimination & mental health challenges with real-time resources and safe guidance.",
  tech: ["Flask", "TensorFlow", "Gemini API"],
  image: "/achievements/bbreak.png",
  link: "https://www.linkedin.com/posts/lavansh-choubey-683355314_hackathon-genderequality-aiforgood-activity-7301246732061851648-JkjO?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE_JHoMBDGQ2FfJepNd7G5lBWyKXQ9UbkVA"
},
{
  type: "ideathon",
  name: "INN-ING 2K24 (SRM University)",
  position: "Winner",
  prize: "—",
  description: "Pitched BioSync, an AI-powered personalized health platform delivering tailored wellness insights for better lifestyle tracking.",
  tech: ["AI", "Health Tech", "Data Analytics"],
  image: "/achievements/biosync.png",
  link: "https://www.linkedin.com/posts/lavansh-choubey-683355314_innovation-healthtech-studentproject-activity-7271149816326369280-o13d?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE_JHoMBDGQ2FfJepNd7G5lBWyKXQ9UbkVA"
},
{
  type: "ideathon",
  name: "Ennovate Ideathon (E-Summit '25, SRM IST)",
  position: "1st Runners-Up",
  prize: "—",
  description: "Pitched Costwise, an AI-powered personal finance assistant that simplifies budgeting, tracks expenses, and promotes smart saving.",
  tech: ["AI", "Finance Tech", "Flask"],
  image: "/achievements/costwise.png",
  link: "https://www.linkedin.com/posts/lavansh-choubey-683355314_thrilled-to-share-that-our-teambinarycrz-activity-7323785884309331969-a5qY?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE_JHoMBDGQ2FfJepNd7G5lBWyKXQ9UbkVA"
},
{
  type: "ideathon",
  name: "CHEMFLUX 12.0 (SRM IST)",
  position: "2nd Prize",
  prize: "—",
  description: "Pitched WasteWise, a gamified AI & AR solution that makes waste management rewarding through AI-powered waste analysis, AR upcycling, and eco-missions.",
  tech: ["AI", "AR", "Gamification"],
  image: "/achievements/wastewise.png",
  link: "https://www.linkedin.com/posts/sistla-priya-375a67340_chemflux12-wastewise-aiforgood-ugcPost-7308825316565606401-U1Tn?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE_JHoMBDGQ2FfJepNd7G5lBWyKXQ9UbkVA"
}

  ];

  const panels = useMemo(
    () =>
      achievements.map((achievement, index) => (
        <a key={`achv-${index}-${(achievement.name || '').replace(/\s+/g, '-').toLowerCase()}`} href={(achievement as any).link || '#'} target="_blank" rel="noopener noreferrer" className="victory-card group h-full relative block">
          <div className="relative overflow-hidden rounded-lg bg-gray-900 p-3 sm:p-4 md:p-5 hover:bg-gray-800 transition-all duration-300 border border-gray-800 hover:border-[#00ff88]/50 h-full">
            {/* Subtle particle background (toned down for Victory Archives) */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <ParticleFieldSmall density={0.00012} className="opacity-20" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

            <div className="relative z-30">
              <div className="flex justify-between items-start mb-3 gap-2">
                <div className="flex-shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-xs whitespace-nowrap ${achievement.type === 'hackathon' ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-[#00a2ff]/20 text-[#00a2ff]'}`}>
                    {(achievement.type || '').toUpperCase()}
                  </span>
                </div>
                <span className="text-[#00ff88] font-mono text-xs sm:text-sm flex-shrink-0">{achievement.prize}</span>
              </div>

              <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1.5 text-white break-words leading-tight">{achievement.name}</h3>
              <p className="text-[#00ff88] font-semibold mb-2 text-xs sm:text-sm break-words">{achievement.position}</p>
              <p className="text-gray-400 mb-3 text-xs sm:text-sm leading-relaxed break-words line-clamp-3">{achievement.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {(achievement.tech || []).map((tech, techIndex) => (
                  <span key={techIndex} className="px-1.5 py-0.5 bg-black/50 rounded text-xs text-gray-300 border border-gray-800">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </a>
      )),
    [achievements]
  );

  return (
    <section id="victory-archives" className="bg-black text-white py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-8 sm:mb-12 md:mb-16 px-2">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Victory Archives
          </motion.h2>
          <motion.div
            className="h-1 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-[#00ff88] to-[#00a2ff] mx-auto"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Horizontal pinned scroller for achievements */}
        <HorizontalScroller items={panels} height={380} startAnimations={isInView} />
      </div>
    </section>
  );
};