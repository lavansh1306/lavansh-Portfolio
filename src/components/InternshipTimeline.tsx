import React, { useState } from 'react'

type Internship = {
  id: string
  role: string
  company: string
  period: string
  location?: string
  bullets: string[]
  tech: string[]
  verified?: boolean
  certificateLink?: string
}

const accent = '#00ff88'

const sampleData: Internship[] = [
  {
    id: 'skill-first',
    role: 'Technical Intern',
    company: 'Skill First Labs',
    period: '09/10/2025 – Present',
    location: 'Remote',
    bullets: [
      'Researched certification programs aligned with company frameworks and client requirements.',
      'Mapped certifications to technical roles for candidate evaluation with the Product team.',
      'Created certification matrix to identify skill gaps and optimize hiring decisions.',
    ],
    tech: ['Figma', 'Notion', 'Excel', 'CRM Tools', 'Project Management'],
    verified: true,
    certificateLink:
      'https://drive.google.com/file/d/1rLhKtw6PiLhF5qNaTamE-Q3h8zlFpPHl/view',
  },
  {
    id: 'phoenix',
    role: 'Business Development Intern',
    company: 'Phoenix Global',
    period: '10/06/2025 – 10/08/2025',
    bullets: [
      'Conducted outreach to MBA colleges for corporate training program partnerships.',
      'Led meetings with academic decision-makers to present training offerings.',
      'Managed business development pipeline through CRM documentation.',
    ],
    tech: ['LinkedIn', 'CRM', 'Excel', 'Lead Generation'],
    verified: true,
    certificateLink:
      'https://drive.google.com/file/d/1Hc6r0Sx1ZfWPgFOHipjNEI4bJrFCzVge/view',
  },
  {
    id: 'niramaya',
    role: 'AI/Software Intern',
    company: 'Niramaya Health',
    period: '17/01/2025 – 14/09/2025',
    bullets: [
      'Built and experimented with AI/ML models for healthcare applications.',
      'Developed OCR pipeline using PaddleOCR and TrOCR.',
      'Implemented RAG using SentenceTransformers.',
      'Built responsive UI with React and Tailwind.',
    ],
    tech: ['Python', 'React', 'Flask', 'AI/ML', 'OCR'],
    verified: true,
    certificateLink:
      'https://drive.google.com/file/d/1XPd7dv-5HnnDJ-qxP92bBGHLL5ZcTnfL/view',
  },
]

export default function InternshipTimeline({
  data = sampleData,
}: {
  data?: Internship[]
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    /**
     * isolation:isolate is CRITICAL
     * It creates a new stacking context that protects clicks
     */
    <div className="relative flex gap-6 isolate pointer-events-auto">
      {/* Timeline line (non-interactive) */}
      <div className="w-12 flex flex-col items-center relative pointer-events-none">
        <div className="absolute left-6 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[#00392b] opacity-50" />
      </div>

      {/* Cards */}
      <div className="flex-1 flex flex-col gap-16 relative z-10 pointer-events-auto">
        {data.map((item, idx) => (
          <div key={item.id} className="relative">
            <TimelineCard
              item={item}
              isExpanded={expandedId === item.id}
              onExpandToggle={() =>
                setExpandedId(expandedId === item.id ? null : item.id)
              }
            />

            {/* Decorative orbit — ZERO interaction */}
            {idx < data.length - 1 && (
              <div
                className="relative flex justify-center mt-16 pointer-events-none"
                aria-hidden="true"
              >
                <div className="orbit-container">
                  <div className="orbit-circle" />
                  <div className="orbit-dot-wrapper">
                    <div className="orbit-dot" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* HARD KILL for any accidental fixed overlays inside this subtree */}
      <style>{`
        .orbit-container {
          position: relative;
          width: 96px;
          height: 96px;
          pointer-events: none;
        }
        .orbit-circle {
          position: absolute;
          inset: 0;
          border: 1px solid ${accent}44;
          border-radius: 50%;
          box-shadow: 0 0 15px ${accent}22;
        }
        .orbit-dot-wrapper {
          position: absolute;
          inset: 0;
          animation: rotate 4s linear infinite;
        }
        .orbit-dot {
          position: absolute;
          top: -5px;
          left: 50%;
          width: 10px;
          height: 10px;
          background: ${accent};
          border-radius: 50%;
          box-shadow: 0 0 10px ${accent};
        }

        /* DEFENSIVE: any fixed decorative layers inside this component */
        .fixed {
          pointer-events: none;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

function TimelineCard({
  item,
  isExpanded,
  onExpandToggle,
}: {
  item: Internship
  isExpanded: boolean
  onExpandToggle: () => void
}) {
  return (
    <div className="relative flex gap-6 z-20 pointer-events-auto">
      {/* Dot */}
      <div className="absolute -left-[54px] top-8 w-4 h-4 rounded-full bg-[#00ff88] shadow-[0_0_10px_#00ff88] pointer-events-none" />

      <article className="w-full p-6 rounded-2xl border border-[#00ff8844] bg-[#001a16cc] backdrop-blur-md hover:border-[#00ff8888] transition pointer-events-auto">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="text-xl font-mono text-[#00ff88]">
              {item.role}{' '}
              <span className="text-slate-400 text-sm">@ {item.company}</span>
            </h3>

            {item.verified && (
              <span className="inline-block mt-2 text-[10px] font-mono border border-[#00ff88] text-[#00ff88] px-2 py-0.5 rounded bg-[#00ff8811]">
                [STATUS: VERIFIED]
              </span>
            )}

            <p className="text-xs text-slate-500 mt-2 font-mono">
              {item.period}
            </p>
          </div>

          <div className="flex gap-3 pointer-events-auto">
            {item.certificateLink && (
              <a
                href={item.certificateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-bold border border-[#00ff8844] text-[#00ff88] rounded hover:bg-[#00ff8811]"
              >
                View Certificate
              </a>
            )}

            <button
              onClick={onExpandToggle}
              className="px-4 py-2 text-xs font-bold border border-[#00ff8844] text-[#00ff88] rounded hover:bg-[#00ff8811]"
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          {item.bullets.slice(0, 2).map((b, i) => (
            <li key={i} className="text-sm text-slate-300 flex gap-2">
              <span className="text-[#00ff88]">•</span>
              {b}
            </li>
          ))}
        </ul>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-[#00ff8822]">
            <ul className="space-y-2 mb-4">
              {item.bullets.slice(2).map((b, i) => (
                <li key={i} className="text-sm text-slate-300 flex gap-2">
                  <span className="text-[#00ff88]">•</span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {item.tech.map(t => (
                <span
                  key={t}
                  className="text-[10px] bg-[#00ff8811] text-[#00ff88] px-2 py-1 rounded border border-[#00ff8822]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
