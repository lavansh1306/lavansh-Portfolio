import { useState } from 'react';
import { motion } from 'framer-motion';
import { HolographicCard } from './HolographicCard';
import { Mail, Github, Linkedin, MessageSquare, Send, Zap } from 'lucide-react';

const contactMethods = [
  {
    id: 'email',
    name: 'Direct Neural Link',
    description: 'Primary communication channel',
    icon: Mail,
    value: 'lavansh1201a@gmail.com',
    colorClass: 'text-neon-cyan',
    bgClass: 'bg-neon-cyan/20',
    borderClass: 'border-neon-cyan/30',
    hoverClass: 'hover:bg-neon-cyan/10',
    action: 'ESTABLISH CONNECTION'
  },
  {
    id: 'github',
    name: 'Code Repository Access',
    description: 'Witness the digital architecture',
    icon: Github,
    value: 'github.com/lavansh1306',
    colorClass: 'text-neon-green',
    bgClass: 'bg-neon-green/20',
    borderClass: 'border-neon-green/30',
    hoverClass: 'hover:bg-neon-green/10',
    action: 'ACCESS VAULT'
  },
  {
    id: 'linkedin',
    name: 'Professional Network',
    description: 'Corporate interface protocol',
    icon: Linkedin,
    value: 'linkedin.com/in/lavansh-choubey-683355314',
    colorClass: 'text-neon-purple',
    bgClass: 'bg-neon-purple/20',
    borderClass: 'border-neon-purple/30',
    hoverClass: 'hover:bg-neon-purple/10',
    action: 'SYNC PROFILE'
  },
  {
    id: 'discord',
    name: 'Real-time Channel',
    description: 'Instant collaboration gateway',
    icon: MessageSquare,
    value: 'lavansh#1337',
    colorClass: 'text-neon-gold',
    bgClass: 'bg-neon-gold/20',
    borderClass: 'border-neon-gold/30',
    hoverClass: 'hover:bg-neon-gold/10',
    action: 'JOIN SERVER'
  }
];

export const NeuralBridge = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isTransmitting, setIsTransmitting] = useState(false);

  const handleTransmit = () => {
    setIsTransmitting(true);
    // Simulate transmission
    setTimeout(() => {
      setIsTransmitting(false);
      setMessage('');
      // Reset selection after transmission
      setTimeout(() => setSelectedMethod(null), 1000);
    }, 2000);
  };

  return (
    <section className="py-20 relative">
      {/* Neural network background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-neon-purple rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-neon-gold rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--neon-cyan))" />
              <stop offset="100%" stopColor="hsl(var(--neon-purple))" />
            </linearGradient>
          </defs>
          <path
            d="M 100 200 Q 300 150 500 300 T 800 250"
            stroke="url(#neuralGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M 200 400 Q 400 350 600 500 T 900 450"
            stroke="url(#neuralGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Top decorative card grid removed to avoid duplication. The interactive card grid below handles contact selection. */}

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-cyber text-primary animate-neon-pulse mb-4">
            Connect With Me
          </h2>
          <div className="w-32 h-1 bg-gradient-neon mx-auto"></div>
          <p className="text-xl text-muted-foreground mt-6 font-matrix">
            Establish connection. Begin transmission.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-cyber text-neon-cyan mt-8 glitch-text"
          >
            Connect--Collaborate--Create
          </motion.div>
        </div>

        {!selectedMethod ? (
          /* Contact Method Selection */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method) => (
              <HolographicCard
                key={method.id}
                className="p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 group interactive"
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="text-center space-y-4">
                  {/* Floating Icon */}
                  <div className={`w-16 h-16 mx-auto rounded-full ${method.bgClass} border ${method.borderClass} flex items-center justify-center group-hover:animate-float`}>
                    <method.icon className={method.colorClass} size={24} />
                  </div>
                  
                  {/* Method Info */}
                  <div>
                    <h3 className="text-lg font-cyber text-foreground group-hover:text-primary transition-colors">
                      {method.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-matrix">
                      {method.description}
                    </p>
                  </div>
                  
                  {/* Connection Value */}
                  <div className={`${method.bgClass} border ${method.borderClass} rounded p-2`}>
                    <p className={`${method.colorClass} text-xs font-matrix`}>
                      {method.value}
                    </p>
                  </div>
                  
                  {/* Action Button */}
                  {method.id === 'github' ? (
                    <a
                      href="https://github.com/lavansh1306"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2 border ${method.borderClass} ${method.colorClass} font-matrix text-sm ${method.hoverClass} transition-colors inline-block text-center`}
                    >
                      {method.action}
                    </a>
                  ) : method.id === 'linkedin' ? (
                    <a
                      href="https://linkedin.com/in/lavansh-choubey-683355314"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2 border ${method.borderClass} ${method.colorClass} font-matrix text-sm ${method.hoverClass} transition-colors inline-block text-center`}
                    >
                      {method.action}
                    </a>
                  ) : (
                    <button className={`w-full py-2 border ${method.borderClass} ${method.colorClass} font-matrix text-sm ${method.hoverClass} transition-colors`}>
                      {method.action}
                    </button>
                  )}
                </div>
              </HolographicCard>
            ))}
          </div>
        ) : (
          /* Message Transmission Interface */
          <div className="max-w-2xl mx-auto">
            <HolographicCard className="p-8">
              <div className="space-y-6">
                {/* Selected Method Header */}
                <div className="text-center border-b border-primary/20 pb-4">
                  <h3 className="text-2xl font-cyber text-primary">
                    CONNECTION ESTABLISHED
                  </h3>
                  <p className="text-muted-foreground font-matrix mt-2">
                    {contactMethods.find(m => m.id === selectedMethod)?.name}
                  </p>
                </div>

                {/* Message Input */}
                <div className="space-y-4">
                  <label className="block text-sm font-matrix text-foreground">
                    MESSAGE PAYLOAD
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-32 bg-void-light border border-primary/30 text-foreground p-4 font-matrix resize-none focus:border-primary focus:outline-none focus:shadow-glow-cyan transition-all"
                    placeholder="Enter your transmission..."
                    disabled={isTransmitting}
                  />
                </div>

                {/* Transmission Controls */}
                <div className="flex gap-4">
                  <button
                    onClick={handleTransmit}
                    disabled={!message.trim() || isTransmitting}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-neon text-void-dark font-cyber disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-glow-intense transition-all interactive"
                  >
                    {isTransmitting ? (
                      <>
                        <Zap className="animate-spin" size={20} />
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        TRANSMIT
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setSelectedMethod(null)}
                    className="px-6 py-3 border border-primary/30 text-primary font-matrix hover:bg-primary/10 transition-colors interactive"
                  >
                    DISCONNECT
                  </button>
                </div>

                {/* Transmission Status */}
                {isTransmitting && (
                  <div className="text-center">
                    <div className="w-full h-1 bg-void-medium rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-neon animate-scan-line"></div>
                    </div>
                    <p className="text-neon-cyan font-matrix text-sm mt-2">
                      Quantum encryption active... Message routing through neural pathways...
                    </p>
                  </div>
                )}
              </div>
            </HolographicCard>
          </div>
        )}

        {/* Closing Statement With*/}
        <div className="text-center mt-16">
          <div className="inline-block">
            <h3 className="text-3xl font-cyber text-transparent bg-gradient-neon bg-clip-text animate-pulse">
              "YOU'VE SEEN THE TRAILER. NOW JOIN THE MISSION."
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};