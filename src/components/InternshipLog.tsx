import React from 'react';

export const InternshipLog: React.FC = () => {
  const tasks = [
    'Assisting in building and experimenting with AI/ML models for applied use cases.',
    'Developing frontend prototypes to test and validate user-facing concepts.',
    'Performing data analysis in Excel and Python, generating actionable insights.',
    'Gathering, cleaning, and preparing datasets for downstream analytics and ML tasks.',
    'Supporting automation workflows and contributing to data-driven decision-making.',
    'Collaborating with the team to integrate prototypes and data solutions into ongoing projects.',
  ];

  return (
    <section id="internship" className="bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl p-6 sm:p-8 overflow-visible">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: '0 0 40px rgba(6,182,212,0.06), inset 0 0 30px rgba(6,182,212,0.02)'
            }}
          />

          <div
            className="relative bg-black/80 rounded-xl border border-cyan-500/20 p-6 sm:p-8"
            style={{
              boxShadow: '0 8px 30px rgba(2,6,23,0.6)',
              backdropFilter: 'saturate(120%) blur(6px)'
            }}
          >
            <div
              aria-hidden="true"
              className="absolute -top-2 left-6 right-6 h-1 rounded-full pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, rgba(6,182,212,0.0), rgba(6,182,212,0.85), rgba(6,182,212,0.0))',
                filter: 'blur(8px)',
                opacity: 0.9,
              }}
            />

            <header className="text-center mb-8">
              <h2
                className="text-2xl sm:text-3xl font-semibold tracking-tight text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.45)]"
              >
                AI/Software Intern <span className="text-gray-300">|</span>{' '}
                <span className="text-gray-300">Niramaya Health</span>{' '}
                <span className="text-gray-400">|</span>{' '}
                <span className="text-gray-400">2025</span>
              </h2>
              <p className="mt-2 text-sm text-gray-400">Vertical activity log — neural path timeline</p>
            </header>

            <div className="relative pl-10">
              <div
                aria-hidden="true"
                className="absolute top-6 bottom-6 left-6 w-[2px] rounded-full"
                style={{
                  background: 'linear-gradient(to bottom, rgba(6,182,212,0.95), rgba(6,182,212,0.25))',
                  boxShadow: '0 0 18px rgba(6,182,212,0.12)'
                }}
              />

              <ul className="space-y-8">
                {tasks.map((task, idx) => (
                  <li key={idx} className="relative flex items-start gap-4 sm:gap-6">
                    <span className="absolute -left-1 sm:-left-1.5 top-1">
                      <span
                        className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full"
                        style={{
                          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12), rgba(6,182,212,0.95))',
                          boxShadow: '0 0 14px rgba(6,182,212,0.75), 0 0 30px rgba(6,182,212,0.18)',
                          border: '1px solid rgba(6,182,212,0.35)'
                        }}
                        aria-hidden="true"
                      />
                    </span>

                    <div className="flex-1">
                      <div
                        className="rounded-lg bg-gradient-to-b from-black/60 to-black/40 border border-cyan-500/10 p-4 sm:p-5"
                        style={{
                          boxShadow: '0 6px 20px rgba(2,6,23,0.6), 0 0 18px rgba(6,182,212,0.03)'
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm sm:text-base font-medium text-gray-100">{`Task ${idx + 1}`}</h3>
                          <span className="text-xs text-cyan-300/80 font-mono">2025</span>
                        </div>

                        <p className="mt-2 text-sm text-gray-300 leading-relaxed">{task}</p>

                        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                          <div className="flex items-center gap-2">
                            <span
                              className="inline-block w-2 h-2 rounded-full"
                              style={{
                                background: 'linear-gradient(90deg, rgba(6,182,212,1), rgba(6,182,212,0.6))',
                                boxShadow: '0 0 8px rgba(6,182,212,0.18)'
                              }}
                              aria-hidden="true"
                            />
                            <span>Core responsibility</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-300 text-xs border border-cyan-600/10 hover:bg-cyan-500/20 transition"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              className="px-2 py-1 rounded bg-transparent text-gray-400 text-xs border border-transparent hover:text-cyan-300 transition"
                            >
                              Notes
                            </button>
                          </div>
                        </div>
                      </div>

                      <div
                        aria-hidden="true"
                        className="mt-2 h-1 w-full"
                        style={{
                          background: 'linear-gradient(90deg, rgba(6,182,212,0.08), transparent)'
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute -bottom-6 left-8 right-8 h-6 rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, rgba(6,182,212,0), rgba(6,182,212,0.6), rgba(6,182,212,0))',
              filter: 'blur(20px)',
              opacity: 0.9,
            }}
          />
        </div>
      </div>
    </section>
  );
};
