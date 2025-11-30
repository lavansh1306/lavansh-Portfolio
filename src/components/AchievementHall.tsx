import { HolographicCard } from './HolographicCard';
import { Trophy, Medal, Zap, Target } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  event: string;
  year: string;
  prize?: string;
  description: string;
  type: 'hackathon' | 'ideathon';
  icon: 'trophy' | 'medal' | 'zap' | 'target';
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Grand Champion',
    event: 'TechNova Hackathon 2024',
    year: '2024',
    prize: '$10,000',
    description: 'Led team to victory with revolutionary AI-powered healthcare solution',
    type: 'hackathon',
    icon: 'trophy'
  },
  {
    id: '2',
    title: 'Innovation Excellence',
    event: 'CyberForge Challenge',
    year: '2024',
    prize: '$7,500',
    description: 'Created blockchain-based identity verification system',
    type: 'hackathon',
    icon: 'zap'
  },
  {
    id: '3',
    title: 'Best Technical Implementation',
    event: 'CodeStorm 2024',
    year: '2024',
    prize: '$5,000',
    description: 'Built quantum computing simulation platform',
    type: 'hackathon',
    icon: 'target'
  },
  {
    id: '4',
    title: 'Future Visionary',
    event: 'IdeaSpark Global',
    year: '2024',
    description: 'Conceptualized AR-based education ecosystem',
    type: 'ideathon',
    icon: 'medal'
  },
  {
    id: '5',
    title: 'People\'s Choice',
    event: 'InnovateFest 2024',
    year: '2024',
    prize: '$3,000',
    description: 'Developed sustainable energy management system',
    type: 'hackathon',
    icon: 'trophy'
  },
  {
    id: '6',
    title: 'Creative Excellence',
    event: 'DesignThink Challenge',
    year: '2023',
    description: 'Designed intuitive mental health support platform',
    type: 'ideathon',
    icon: 'medal'
  },
  {
    id: '7',
    title: 'Technical Innovation',
    event: 'DataHack Summit',
    year: '2023',
    description: 'Revolutionary machine learning approach to climate prediction',
    type: 'ideathon',
    icon: 'zap'
  }
];

const IconComponent = ({ icon }: { icon: Achievement['icon'] }) => {
  const icons = {
    trophy: Trophy,
    medal: Medal,
    zap: Zap,
    target: Target
  };
  const Icon = icons[icon];
  return <Icon size={32} />;
};

export const AchievementHall = () => {
  return (
    <section className="py-20 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-gold/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <div className="mb-6 md:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cyber text-neon-gold animate-neon-pulse mb-4">
              THE VICTORY HALL
            </h2>
            <div className="w-32 sm:w-40 md:w-48 h-1 bg-gradient-to-r from-transparent via-neon-gold to-transparent mx-auto"></div>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-matrix mb-6 md:mb-8 px-2">
            Where legends are forged. Where dominance is proven.
          </p>
          
          {/* Epic Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="text-center">
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-cyber text-neon-red animate-neon-pulse">7</div>
              <div className="text-sm sm:text-base md:text-lg lg:text-xl font-matrix text-foreground mt-2">TOTAL VICTORIES</div>
            </div>
            <div className="text-center">
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-cyber text-neon-green">4</div>
              <div className="text-sm sm:text-base md:text-lg lg:text-xl font-matrix text-foreground mt-2">HACKATHON WINS</div>
            </div>
            <div className="text-center">
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-cyber text-neon-purple">3</div>
              <div className="text-sm sm:text-base md:text-lg lg:text-xl font-matrix text-foreground mt-2">IDEATHON WINS</div>
            </div>
          </div>
          
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-cyber text-primary mb-6 md:mb-8 animate-glitch px-4">
            "THIS IS NOT POTENTIAL. THIS IS PROOF."
          </div>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0">
          {achievements.map((achievement, index) => (
            <HolographicCard 
              key={achievement.id}
              variant="achievement"
              className="p-4 sm:p-5 md:p-6 transform hover:scale-105 transition-all duration-500 group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="space-y-3 sm:space-y-4">
                {/* Icon and Type */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className={`p-2 sm:p-3 rounded-full ${
                    achievement.type === 'hackathon' 
                      ? 'bg-neon-red/20 text-neon-red' 
                      : 'bg-neon-purple/20 text-neon-purple'
                  }`}>
                    <IconComponent icon={achievement.icon} />
                  </div>
                  <div className={`px-2 sm:px-3 py-1 text-xs font-matrix rounded-full ${
                    achievement.type === 'hackathon'
                      ? 'bg-neon-red/20 text-neon-red border border-neon-red/30'
                      : 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
                  }`}>
                    {achievement.type.toUpperCase()}
                  </div>
                </div>

                {/* Title and Event */}
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-cyber text-neon-gold group-hover:animate-neon-pulse break-words">
                    {achievement.title}
                  </h3>
                  <p className="text-foreground font-matrix text-xs sm:text-sm break-words">
                    {achievement.event} • {achievement.year}
                  </p>
                </div>

                {/* Prize */}
                {achievement.prize && (
                  <div className="bg-neon-green/10 border border-neon-green/20 rounded p-3">
                    <div className="text-neon-green font-cyber text-lg">
                      {achievement.prize}
                    </div>
                  </div>
                )}

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {achievement.description}
                </p>

                {/* Victory Indicator */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                  <span className="text-neon-green text-xs font-matrix">VICTORY CONFIRMED</span>
                </div>
              </div>
            </HolographicCard>
          ))}
        </div>

        {/* Closing Statement */}
        <div className="text-center mt-12 md:mt-16 px-4">
          <div className="inline-block bg-gradient-neon text-transparent bg-clip-text">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-cyber animate-pulse">
              THE FUTURE AWAITS ITS ARCHITECT
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};