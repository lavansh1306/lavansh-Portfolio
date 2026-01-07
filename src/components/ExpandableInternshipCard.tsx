import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, hoverGrow } from '../lib/animations';
import { HiBadgeCheck } from 'react-icons/hi';

interface ExpandableInternshipCardProps {
  title?: string;
  organization?: string;
  dateRange?: string;
  contributions?: string[];
  techStack?: string[];
}

const DEFAULT_CONTRIBUTIONS = [
  'Built and experimented with AI/ML models for healthcare applications.',
  'Developed OCR pipeline using PaddleOCR and TrOCR for prescription digitization.',
  'Implemented RAG with SentenceTransformers for medical query responses.',
  'Created responsive frontend prototypes with React and Tailwind CSS.',
];

const DEFAULT_TECH_STACK = ['Python', 'React', 'TensorFlow', 'Flask', 'AI/ML', 'Data Analysis'];

export const ExpandableInternshipCard: React.FC<ExpandableInternshipCardProps> = ({
  title = 'AI/Software Intern',
  organization = 'Niramaya Health',
  dateRange = '17/01/2025 – 14/09/2025',
  contributions = DEFAULT_CONTRIBUTIONS,
  techStack = DEFAULT_TECH_STACK,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Certificate links per organization
  const certLinks: Record<string, string> = {
    'Niramaya Health': 'https://drive.google.com/file/d/1XPd7dv-5HnnDJ-qxP92bBGHLL5ZcTnfL/view?usp=sharing',
    'Phoenix Global': 'https://drive.google.com/file/d/1Hc6r0Sx1ZfWPgFOHipjNEI4bJrFCzVge/view?usp=sharing',
    'Skill First Labs': 'https://drive.google.com/file/d/1y6_B9Bw6wZpb308hTeDko7KUvo0eI4P4/view?usp=sharing'
  };

  const certificateLink = certLinks[organization];

  return (
    <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
      <motion.div
        className={`relative rounded-xl cursor-pointer overflow-hidden bg-black/80 border ${
          isExpanded ? 'border-cyan-500/60 shadow-[0_10px_40px_rgba(6,182,212,0.14)]' : 'border-cyan-500/30'
        }`}
        onClick={() => setIsExpanded((s) => !s)}
        aria-expanded={isExpanded}
        whileHover="hover"
        whileTap="tap"
        initial="rest"
        animate="rest"
        variants={hoverGrow}
      >
        {/* glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            boxShadow: '0 0 30px rgba(6,182,212,0.06), inset 0 0 20px rgba(6,182,212,0.02)'
          }}
        />

        {/* Header / Summary */}
        <div className="relative p-6 sm:p-8 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.35)]">
              {title} <span className="text-gray-300">|</span>{' '}
              <span className="text-gray-300">{organization}</span>
            </h3>

            {/* Verified badge */}
            <div className="flex items-center gap-2 mt-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs font-medium">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-400">{dateRange}</p>
          </div>

          {/* Certificate button - top right */}
          {certificateLink && (
            <a
              href={certificateLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 text-cyan-400 text-sm font-medium hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-400/60 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <HiBadgeCheck className="w-5 h-5" />
              <span className="hidden sm:inline">View Certificate</span>
            </a>
          )}

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 hidden sm:inline">{isExpanded ? 'Collapse' : 'Expand'}</span>
            <div
              className={`p-2 rounded-md transition-transform duration-300 ${
                isExpanded ? 'rotate-180 bg-cyan-500/10' : 'bg-transparent'
              }`}
            >
              {/* Chevron SVG */}
              <svg
                className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Expandable content */}
        <div
          className={`transition-[max-height,opacity,padding] duration-500 ease-out px-6 ${
            isExpanded ? 'pb-8 pt-0 opacity-100' : 'pb-0 pt-0 opacity-0'
          }`}
          style={{ maxHeight: isExpanded ? 800 : 0 }}
        >
          <div className="mt-2">
            <div className="relative pl-10">
              {/* vertical neon spine */}
              <div
                aria-hidden
                className="absolute top-4 bottom-4 left-6 w-[2px] rounded-full"
                style={{
                  background: 'linear-gradient(to bottom, rgba(6,182,212,0.95), rgba(6,182,212,0.25))',
                  boxShadow: '0 0 18px rgba(6,182,212,0.12)'
                }}
              />

                <ul className="space-y-4">
                  {contributions.map((c, i) => (
                    <li key={i} className="relative flex items-start gap-3">
                      {/* Terminal-style bullet point */}
                      <span 
                        className="text-cyan-400 font-mono text-lg font-bold select-none flex-shrink-0 mt-0.5"
                        style={{
                          textShadow: '0 0 8px rgba(6, 182, 212, 0.5)'
                        }}
                      >
                        &gt;
                      </span>

                      {/* Clean description text */}
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        {c}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Badges */}
                {techStack && techStack.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-cyan-500/20">
                    <h4 className="text-xs font-medium text-cyan-400 mb-3 uppercase tracking-wider">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech, i) => (
                        <span 
                          key={i}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:border-cyan-400/30 hover:text-cyan-300 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
