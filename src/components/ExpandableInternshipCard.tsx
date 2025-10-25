import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, hoverGrow } from '../lib/animations';

interface ExpandableInternshipCardProps {
  title?: string;
  organization?: string;
  dateRange?: string;
  contributions?: string[];
}

const DEFAULT_CONTRIBUTIONS = [
  'Assisting in building and experimenting with AI/ML models for applied use cases.',
  'Developing frontend prototypes to test and validate user-facing concepts.',
  'Performing data analysis in Excel and Python, generating actionable insights.',
  'Gathering, cleaning, and preparing datasets for downstream analytics and ML tasks.',
  'Supporting automation workflows and contributing to data-driven decision-making.',
  'Collaborating with the team to integrate prototypes and data solutions into ongoing projects.',
];

export const ExpandableInternshipCard: React.FC<ExpandableInternshipCardProps> = ({
  title = 'AI/Software Intern',
  organization = 'Niramaya Health',
  dateRange = '17/01/2025 – 14/09/2025',
  contributions = DEFAULT_CONTRIBUTIONS,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
        <div className="relative p-6 sm:p-8 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.35)]">
              {title} <span className="text-gray-300">|</span>{' '}
              <span className="text-gray-300">{organization}</span>
            </h3>
            <p className="mt-1 text-sm text-gray-400">{dateRange}</p>
          </div>

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

              <ul className="space-y-6">
                {contributions.map((c, i) => (
                  <li key={i} className="relative flex items-start gap-4">
                    <span className="absolute -left-1 top-1">
                      <span
                        className="inline-flex items-center justify-center w-4 h-4 rounded-full"
                        style={{
                          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12), rgba(6,182,212,0.95))',
                          boxShadow: '0 0 12px rgba(6,182,212,0.6)'
                        }}
                      />
                    </span>

                    <div className="flex-1">
                      <div className="rounded-md p-3 bg-black/60 border border-cyan-500/10">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm text-gray-100 font-medium">{`Contribution ${i + 1}`}</h4>
                          <span className="text-xs text-cyan-300 font-mono">2025</span>
                        </div>

                        <p className="mt-2 text-sm text-gray-300 leading-relaxed">{c}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
