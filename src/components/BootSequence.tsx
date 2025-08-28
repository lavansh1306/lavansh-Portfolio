import { useEffect, useState } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const bootSteps = [
    "INITIALIZING NEURAL INTERFACE...",
    "LOADING SUBJECT: LAVANSH",
    "ACCESSING HACKATHON DATABASE [||||      ] 40%",
    "ACCESSING HACKATHON DATABASE [||||||    ] 60%", 
    "ACCESSING HACKATHON DATABASE [||||||||  ] 80%",
    "ACCESSING HACKATHON DATABASE [||||||||||] 100%",
    "COMPILING AMBITION.EXE",
    "LOADING ACHIEVEMENTS MODULE",
    "ESTABLISHING DIGITAL DOMINANCE...",
    "SYSTEM READY. WELCOME TO THE FUTURE."
  ];

  useEffect(() => {
    if (currentStep < bootSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, currentStep === 0 ? 1000 : 800);
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }, 1500);
      return () => clearTimeout(completeTimer);
    }
  }, [currentStep, bootSteps.length, onComplete]);

  if (isComplete) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50 animate-[fadeOut_1s_ease-out_forwards]">
        <div className="text-center">
          <div className="text-4xl font-cyber text-primary animate-neon-pulse mb-8">
            SYSTEM ONLINE
          </div>
          <div className="w-64 h-1 bg-gradient-neon animate-scan-line"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="max-w-2xl w-full px-8">
        {/* Terminal Header */}
        <div className="border border-primary/30 bg-void-light/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 p-4 border-b border-primary/20">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-neon-red"></div>
              <div className="w-3 h-3 rounded-full bg-neon-gold"></div>
              <div className="w-3 h-3 rounded-full bg-neon-green"></div>
            </div>
            <div className="text-sm font-matrix text-muted-foreground ml-4">
              NEURAL_INTERFACE_v2.1.0
            </div>
          </div>
          
          {/* Terminal Content */}
          <div className="p-6 min-h-64 font-matrix">
            {bootSteps.slice(0, currentStep).map((step, index) => (
              <div 
                key={index}
                className={`text-primary mb-2 transition-all duration-300 ${
                  index === currentStep - 1 ? 'animate-typing' : ''
                }`}
              >
                <span className="text-neon-green mr-2">{'>'}</span>
                {step}
              </div>
            ))}
            
            {/* Blinking cursor */}
            {currentStep <= bootSteps.length && (
              <div className="inline-flex items-center">
                <span className="text-neon-green mr-2">{'>'}</span>
                <span className="w-2 h-5 bg-primary animate-blink"></span>
              </div>
            )}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-8">
          <div className="w-full h-1 bg-void-medium rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-neon transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / bootSteps.length) * 100}%` }}
            />
          </div>
          <div className="text-center mt-2 text-sm font-matrix text-muted-foreground">
            INITIALIZING... {Math.round((currentStep / bootSteps.length) * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
};