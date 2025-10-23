import React from 'react';
import { motion } from 'framer-motion';

export const AchievementShowcase = () => {
  const achievements = [
    {
  type: "hackathon",
  name: "GeoNova Hackathon 2025 (SRM Easwari Engineering College)",
  position: "Winner",
  prize: "₹12,000",
  description: "Developed HydroSense — an AI-based smart water management system using IoT to monitor consumption, detect leaks, and optimize water flow for sustainable living.",
  tech: ["Python", "IoT", "TensorFlow", "Flask"],
  image: "/achievements/geonova.png"
},
{
  type: "hackathon",
  name: "HackPick 2025 (Altruisty Innovations x SRM IST Career Centre)",
  position: "2nd Place",
  prize: "—",
  description: "Built Emulsify, a high-performance real-time data processing & visualization platform enabling fast analytics and decision-making.",
  tech: ["Rust", "ClickHouse", "Apache Flink", "React"],
  image: "/achievements/hackpick.png"
},
{
  type: "hackathon",
  name: "Producting101 Hackathon 2025",
  position: "2nd Place",
  prize: "—",
  description: "Created Connectfy — an AI-powered networking app for events, matching attendees based on interests to enable smarter professional connections.",
  tech: ["Next.js", "Flask", "AI Matching"],
  image: "/achievements/connectfy.png"
},
{
  type: "hackathon",
  name: "Gender-Inclusive Future Hackathon (SRM IST)",
  position: "2nd Runners-Up",
  prize: "—",
  description: "Built B-Break, an AI chatbot supporting individuals facing gender discrimination & mental health challenges with real-time resources and safe guidance.",
  tech: ["Flask", "TensorFlow", "Gemini API"],
  image: "/achievements/bbreak.png"
},
{
  type: "ideathon",
  name: "INN-ING 2K24 (SRM University)",
  position: "Winner",
  prize: "—",
  description: "Developed BioSync, an AI-powered personalized health platform delivering tailored wellness insights for better lifestyle tracking.",
  tech: ["AI", "Health Tech", "Data Analytics"],
  image: "/achievements/biosync.png"
},
{
  type: "ideathon",
  name: "Ennovate Ideathon (E-Summit '25, SRM IST)",
  position: "1st Runners-Up",
  prize: "—",
  description: "Pitched Costwise, an AI-powered personal finance assistant that simplifies budgeting, tracks expenses, and promotes smart saving.",
  tech: ["AI", "Finance Tech", "Flask"],
  image: "/achievements/costwise.png"
},
{
  type: "ideathon",
  name: "CHEMFLUX 12.0 (SRM IST)",
  position: "2nd Prize",
  prize: "—",
  description: "Built WasteWise, a gamified AI & AR solution that makes waste management rewarding through AI-powered waste analysis, AR upcycling, and eco-missions.",
  tech: ["AI", "AR", "Gamification"],
  image: "/achievements/wastewise.png"
}

  ];

  return (
    <section className="min-h-screen bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Achievement Cards */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Victory Archives
          </motion.h2>
          <motion.div
            className="h-1 w-32 bg-gradient-to-r from-[#00ff88] to-[#00a2ff] mx-auto"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-900 p-6 hover:bg-gray-800 transition-all duration-300 border border-gray-800 hover:border-[#00ff88]/50 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        achievement.type === 'hackathon' ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-[#00a2ff]/20 text-[#00a2ff]'
                      }`}>
                        {(achievement.type || '').toUpperCase()}
                      </span>
                    </div>
                    <span className="text-[#00ff88] font-mono">{achievement.prize}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-white">{achievement.name}</h3>
                  <p className="text-[#00ff88] font-semibold mb-3">{achievement.position}</p>
                  <p className="text-gray-400 mb-4">{achievement.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {(achievement.tech || []).map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 bg-black/50 rounded text-sm text-gray-300 border border-gray-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section removed from here. Contact/Connect UI is handled by NeuralBridge component to avoid duplication. */}
      </div>
    </section>
  );
};
