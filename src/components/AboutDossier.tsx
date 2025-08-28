import { HolographicCard } from './HolographicCard';
import { Brain, Code, Rocket, Zap } from 'lucide-react';

const skills = [
  { name: 'Full Stack Development', level: 95, colorClass: 'text-neon-cyan', bgClass: 'bg-neon-cyan' },
  { name: 'AI/ML Engineering', level: 90, colorClass: 'text-neon-purple', bgClass: 'bg-neon-purple' },
  { name: 'Blockchain Development', level: 85, colorClass: 'text-neon-green', bgClass: 'bg-neon-green' },
  { name: 'System Architecture', level: 92, colorClass: 'text-neon-gold', bgClass: 'bg-neon-gold' },
  { name: 'DevOps & Cloud', level: 88, colorClass: 'text-neon-red', bgClass: 'bg-neon-red' }
];

const timeline = [
  {
    year: '2024',
    title: 'The Domination Era',
    description: '4 Hackathon victories. Multiple breakthrough innovations. The legend solidifies.',
    icon: Rocket,
    colorClass: 'text-neon-gold',
    bgClass: 'bg-neon-gold/20',
    borderClass: 'border-neon-gold/30'
  },
  {
    year: '2023',
    title: 'The Awakening',
    description: 'First hackathon wins. The potential crystallizes into unstoppable force.',
    icon: Zap,
    colorClass: 'text-neon-cyan',
    bgClass: 'bg-neon-cyan/20',
    borderClass: 'border-neon-cyan/30'
  },
  {
    year: '2022',
    title: 'The Foundation',
    description: 'Advanced programming mastery. AI/ML specialization. The arsenal assembles.',
    icon: Code,
    colorClass: 'text-neon-purple',
    bgClass: 'bg-neon-purple/20',
    borderClass: 'border-neon-purple/30'
  },
  {
    year: '2021',
    title: 'The Genesis',
    description: 'First lines of code. The neural pathways of innovation begin forming.',
    icon: Brain,
    colorClass: 'text-neon-green',
    bgClass: 'bg-neon-green/20',
    borderClass: 'border-neon-green/30'
  }
];

export const AboutDossier = () => {
  return (
    <section className="py-20 relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-cyber text-primary animate-neon-pulse mb-4">
            SUBJECT DOSSIER: LAVANSH
          </h2>
          <div className="w-32 h-1 bg-gradient-neon mx-auto"></div>
          <p className="text-xl text-muted-foreground mt-6 font-matrix">
            Analyzing the entity reshaping tomorrow
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Main Profile */}
          <HolographicCard variant="dossier" className="p-8">
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="text-center border-b border-primary/20 pb-6">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-neon rounded-full p-1">
                  <div className="w-full h-full bg-void-dark rounded-full flex items-center justify-center">
                    <span className="text-4xl font-cyber text-primary">L</span>
                  </div>
                </div>
                <h3 className="text-2xl font-cyber text-foreground">LAVANSH</h3>
                <p className="text-neon-purple font-matrix">Full Stack Innovator • AI Engineer • System Architect</p>
              </div>

              {/* Core Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-void-medium/50 border border-neon-cyan/20">
                  <div className="text-2xl font-cyber text-neon-cyan">7</div>
                  <div className="text-xs font-matrix text-muted-foreground">VICTORIES</div>
                </div>
                <div className="text-center p-3 bg-void-medium/50 border border-neon-green/20">
                  <div className="text-2xl font-cyber text-neon-green">50+</div>
                  <div className="text-xs font-matrix text-muted-foreground">PROJECTS</div>
                </div>
                <div className="text-center p-3 bg-void-medium/50 border border-neon-purple/20">
                  <div className="text-2xl font-cyber text-neon-purple">15+</div>
                  <div className="text-xs font-matrix text-muted-foreground">TECHNOLOGIES</div>
                </div>
                <div className="text-center p-3 bg-void-medium/50 border border-neon-gold/20">
                  <div className="text-2xl font-cyber text-neon-gold">∞</div>
                  <div className="text-xs font-matrix text-muted-foreground">AMBITION</div>
                </div>
              </div>

              {/* Mission Statement */}
              <div className="bg-neon-red/10 border border-neon-red/20 p-4">
                <h4 className="text-neon-red font-cyber mb-2">MISSION DIRECTIVE</h4>
                <p className="text-sm text-foreground font-matrix leading-relaxed">
                  "I am not here to participate. I am here to dominate. Every hackathon is a battlefield. 
                  Every victory is a step toward reshaping the technological landscape."
                </p>
              </div>
            </div>
          </HolographicCard>

          {/* Skills Matrix */}
          <HolographicCard className="p-8">
            <h3 className="text-2xl font-cyber text-primary mb-6">SKILL MATRIX</h3>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-matrix text-foreground">{skill.name}</span>
                    <span className={`${skill.colorClass} font-cyber`}>{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-void-medium rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${skill.bgClass} transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </HolographicCard>
        </div>

        {/* Timeline */}
        <div className="mt-16">
          <h3 className="text-3xl font-cyber text-center text-primary mb-12">
            NEURAL PATHWAY TIMELINE
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item, index) => (
              <HolographicCard 
                key={item.year}
                className="p-6 transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-full ${item.bgClass} border ${item.borderClass} flex items-center justify-center`}>
                    <item.icon className={item.colorClass} size={24} />
                  </div>
                  
                  <div>
                    <div className={`text-2xl font-cyber ${item.colorClass} mb-1`}>
                      {item.year}
                    </div>
                    <h4 className="text-lg font-cyber text-foreground mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground font-matrix leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </HolographicCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};