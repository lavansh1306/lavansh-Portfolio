import { useState, useEffect } from 'react';
import { CyberCursor } from './CyberCursor';
import { BootSequence } from './BootSequence';
import { AboutDossier } from './AboutDossier';
import { ProjectVault } from './ProjectVault';
import { AchievementHall } from './AchievementHall';
import { NeuralBridge } from './NeuralBridge';
import { ChevronDown } from 'lucide-react';

export const CinematicPortfolio = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleBootComplete = () => {
    setIsBooting(false);
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  };

  useEffect(() => {
    // Disable scrolling during boot
    if (isBooting) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isBooting]);

  if (isBooting) {
    return (
      <>
        <CyberCursor />
        <BootSequence onComplete={handleBootComplete} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <CyberCursor />
      
      {/* Matrix rain effect */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-neon-green font-matrix text-sm animate-matrix-rain"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j} className="opacity-50">
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </div>
        ))}
      </div>

      {showContent && (
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20 animate-pulse"></div>
            
            {/* Floating particles */}
            <div className="absolute inset-0">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full animate-float opacity-30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 4}s`
                  }}
                />
              ))}
            </div>

            <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-7xl md:text-9xl font-cyber text-transparent bg-gradient-neon bg-clip-text animate-neon-pulse">
                  LAVANSH
                </h1>
                <div className="h-1 w-64 bg-gradient-neon mx-auto"></div>
              </div>

              {/* Subtitle */}
              <div className="space-y-4">
                <p className="text-2xl md:text-3xl font-matrix text-foreground animate-fade-in">
                  FULL STACK INNOVATOR • AI ENGINEER • DIGITAL ARCHITECT
                </p>
                <p className="text-lg text-muted-foreground font-matrix max-w-2xl mx-auto leading-relaxed">
                  Not here to participate. Here to dominate. 
                  <span className="text-neon-red animate-pulse"> 7 victories.</span> 
                  <span className="text-neon-green"> Countless innovations.</span> 
                  <span className="text-neon-purple"> Infinite potential.</span>
                </p>
              </div>

              {/* Epic Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center space-y-2">
                  <div className="text-5xl font-cyber text-neon-red animate-neon-pulse">7</div>
                  <div className="text-sm font-matrix text-muted-foreground">TOTAL VICTORIES</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-5xl font-cyber text-neon-green animate-pulse">50+</div>
                  <div className="text-sm font-matrix text-muted-foreground">PROJECTS DEPLOYED</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-5xl font-cyber text-neon-purple animate-float">∞</div>
                  <div className="text-sm font-matrix text-muted-foreground">POTENTIAL UNLOCKED</div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex flex-col items-center space-y-6 mt-16">
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative px-12 py-4 bg-gradient-neon text-void-dark font-cyber text-lg hover:shadow-glow-intense transition-all duration-300 interactive"
                >
                  <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  INITIATE NEURAL SCAN
                </button>
                
                <div className="animate-bounce">
                  <ChevronDown className="text-primary" size={32} />
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <div id="about">
            <AboutDossier />
          </div>

          {/* Projects Section */} 
          <div id="projects">
            <ProjectVault />
          </div>

          {/* Achievements Section */}
          <div id="achievements">
            <AchievementHall />
          </div>

          {/* Contact Section */}
          <div id="contact">
            <NeuralBridge />
          </div>

          {/* Footer */}
          <footer className="py-12 border-t border-primary/20 bg-gradient-to-t from-void-light to-transparent">
            <div className="container mx-auto px-4 text-center">
              <div className="space-y-4">
                <div className="text-2xl font-cyber text-transparent bg-gradient-neon bg-clip-text">
                  THE FUTURE IS NOT COMING.
                </div>
                <div className="text-xl font-cyber text-primary animate-neon-pulse">
                  IT IS ALREADY HERE.
                </div>
                <div className="text-sm font-matrix text-muted-foreground">
                  © 2024 LAVANSH • NEURAL INTERFACE v2.1.0 • ALL SYSTEMS OPERATIONAL
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};