import { useState } from 'react';
import { HolographicCard } from './HolographicCard';
import { ExternalLink, Github, Trophy } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  achievement?: string;
  links: {
    demo?: string;
    github?: string;
  };
  category: 'hackathon' | 'personal' | 'ideathon';
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Neural Commerce Platform',
    description: 'AI-powered e-commerce platform with predictive analytics and neural recommendation engine.',
    tech: ['React', 'Node.js', 'TensorFlow', 'PostgreSQL'],
    achievement: '🏆 Best Innovation Award - HackCortex 2024',
    links: { demo: '#', github: '#' },
    category: 'hackathon'
  },
  {
    id: '2',
    title: 'Quantum Task Manager',
    description: 'Revolutionary productivity app using quantum computing principles for task optimization.',
    tech: ['Vue.js', 'Python', 'Quantum SDK', 'MongoDB'],
    achievement: '🥇 1st Place - FutureTech Hackathon',
    links: { demo: '#', github: '#' },
    category: 'hackathon'
  },
  {
    id: '3',
    title: 'Blockchain Identity Vault',
    description: 'Decentralized identity management system with biometric authentication.',
    tech: ['Solidity', 'Web3.js', 'IPFS', 'Metamask'],
    achievement: '🚀 People\'s Choice - CryptoHack 2024',
    links: { demo: '#', github: '#' },
    category: 'hackathon'
  },
  {
    id: '4',
    title: 'AR Social Network',
    description: 'Augmented reality social platform for virtual meetups and collaboration.',
    tech: ['Unity', 'C#', 'ARCore', 'Firebase'],
    achievement: '💡 Best Concept - IdeaSpark Contest',
    links: { demo: '#', github: '#' },
    category: 'ideathon'
  }
];

export const ProjectVault = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-cyber text-primary animate-neon-pulse mb-4">
            THE ARSENAL VAULT
          </h2>
          <div className="w-32 h-1 bg-gradient-neon mx-auto"></div>
          <p className="text-xl text-muted-foreground mt-6 font-matrix">
            Each project is a weapon. Each victory is proof.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <HolographicCard 
              key={project.id}
              className="p-6 cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedProject(project)}
            >
              <div className="space-y-4">
                {/* Project Category Badge */}
                <div className={`inline-block px-3 py-1 text-xs font-matrix rounded-full ${
                  project.category === 'hackathon' 
                    ? 'bg-neon-red/20 text-neon-red border border-neon-red/30'
                    : project.category === 'ideathon'
                    ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
                    : 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                }`}>
                  {project.category.toUpperCase()}
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-cyber text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Achievement */}
                {project.achievement && (
                  <div className="bg-neon-gold/10 border border-neon-gold/20 rounded p-2">
                    <p className="text-neon-gold text-xs font-matrix">
                      {project.achievement}
                    </p>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 text-xs bg-void-medium border border-primary/20 text-primary font-matrix"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex gap-3 pt-2">
                  {project.links.demo && (
                    <button className="flex items-center gap-2 text-sm text-neon-cyan hover:text-neon-green transition-colors">
                      <ExternalLink size={16} />
                      DEMO
                    </button>
                  )}
                  {project.links.github && (
                    <button className="flex items-center gap-2 text-sm text-neon-cyan hover:text-neon-green transition-colors">
                      <Github size={16} />
                      CODE
                    </button>
                  )}
                </div>
              </div>
            </HolographicCard>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-cyber text-neon-cyan animate-neon-pulse">7</div>
            <div className="text-sm font-matrix text-muted-foreground">TOTAL WINS</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-cyber text-neon-green">4</div>
            <div className="text-sm font-matrix text-muted-foreground">HACKATHONS</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-cyber text-neon-purple">3</div>
            <div className="text-sm font-matrix text-muted-foreground">IDEATHONS</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-cyber text-neon-gold">∞</div>
            <div className="text-sm font-matrix text-muted-foreground">POTENTIAL</div>
          </div>
        </div>
      </div>
    </section>
  );
};