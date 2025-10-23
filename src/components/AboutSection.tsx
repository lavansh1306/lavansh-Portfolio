import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';

export const AboutSection = () => {
  const skills = [
    { name: 'Full Stack Development', level: 95, color: 'bg-blue-500' },
    { name: 'AI/ML Engineering', level: 90, color: 'bg-purple-500' },
    { name: 'System Architecture', level: 92, color: 'bg-green-500' },
    { name: 'Cloud & DevOps', level: 88, color: 'bg-orange-500' },
    { name: 'Blockchain Development', level: 85, color: 'bg-pink-500' }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-8">
            Full Stack Innovator & AI Engineer
          </h2>
          <p className="text-gray-300 text-xl mb-12 max-w-3xl">
            Transforming complex challenges into elegant solutions. Specialized in building scalable applications
            that leverage cutting-edge AI/ML capabilities. Past experience includes projects at scale serving
            millions of users.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold text-white mb-4">Technical Expertise</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-gray-300">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full rounded-full ${skill.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold text-white mb-4">Professional Highlights</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-500 mr-3">•</div>
                  <span>Led development of enterprise-scale AI systems</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-500 mr-3">•</div>
                  <span>Architected cloud-native applications with 99.99% uptime</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-500/20 text-green-500 mr-3">•</div>
                  <span>Developed ML models improving efficiency by 40%</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-orange-500/20 text-orange-500 mr-3">•</div>
                  <span>Contributed to open-source projects with 1000+ stars</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
