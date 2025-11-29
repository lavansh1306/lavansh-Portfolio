import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

const steps = [
  'INIT: terminal-session v1.0',
  'SECURE: verifying sandbox...',
  'CACHE: loading shaders & particles',
  'UI: applying matrix theme',
  'READY: launching terminal'
];

export const TerminalBoot: React.FC<Props> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [skipped, setSkipped] = useState(false);

  // If session visited, skip immediately
  useEffect(() => {
    const visited = sessionStorage.getItem('visited');
    if (visited === 'true') {
      onComplete();
      return;
    }
    sessionStorage.setItem('visited', 'true');
  }, [onComplete]);

  useEffect(() => {
    if (index >= steps.length) {
      const t = setTimeout(() => onComplete(), 300);
      return () => clearTimeout(t);
    }

    // shorten total to ~3s
    const delay = index === 0 ? 300 : 250;
    const timer = setTimeout(() => setIndex(i => i + 1), delay);
    return () => clearTimeout(timer);
  }, [index, onComplete]);

  // allow skipping the boot with Enter, Space or Escape
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Enter' || e.code === 'Space' || e.key === 'Escape') {
        if (!skipped) setSkipped(true);
        onComplete();
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-terminal-open"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="terminal-boot-panel">
        <div className="terminal-boot-header">
          <div className="dot red" />
          <div className="dot yellow" />
          <div className="dot green" />
          <div className="ml-3 font-mono text-sm text-green-300">TERMINAL BOOT</div>
          <div className="ml-auto text-xs text-slate-400" style={{marginLeft:12}}>Press <kbd>Enter</kbd>, <kbd>Space</kbd> or <kbd>Esc</kbd> to skip</div>
        </div>

        <div className="terminal-boot-body font-mono text-green-200">
          {steps.slice(0, index).map((s, i) => (
            <div key={i} className={`boot-line ${i === index - 1 ? 'pulse' : ''}`}>
              &gt; {s}
            </div>
          ))}

          {index < steps.length && (
            <div className="boot-cursor">&gt; <span className="blink" /></div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalBoot;
