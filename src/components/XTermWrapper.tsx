import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import '../styles/cyberpunk.css';
import { useNavigate } from 'react-router-dom';

const PROMPT = '$ ';

export default function XTermWrapper() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const termRef = useRef<Terminal | null>(null);
  const fitRef = useRef<FitAddon | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#041014',
        foreground: '#9ef0b9',
        cursor: '#9ef0b9'
      },
      fontFamily: 'monospace',
      fontSize: 14,
      scrollback: 1000,
    });
    const fit = new FitAddon();
    term.loadAddon(fit);
    termRef.current = term;
    fitRef.current = fit;

    if (containerRef.current) {
      term.open(containerRef.current);
      fit.fit();
    }

    // simple prompt buffer
    let buffer = '';
    let history: string[] = [];
    let hIndex: number | null = null;

    const availableCommands = [
      'help','echo','date','clear','whoami','ls','build','about','skills','projects','contact','github','open'
    ];

    function showPrompt() {
      term.write('\r\n' + PROMPT);
    }

    function writeLines(arr: string | string[]) {
      if (Array.isArray(arr)) arr.forEach(a => term.writeln(a));
      else term.writeln(arr);
    }

    writeLines(['Welcome to the inbuilt terminal.', "Type 'help' to see available commands."]);
    showPrompt();

    term.onData((data) => {
      for (let i = 0; i < data.length; i++) {
        const ch = data[i];
        if (ch === '\r') {
          // enter
          const cmd = buffer.trim();
          if (cmd.length === 0) { showPrompt(); buffer = ''; return; }
          term.writeln('');
          term.writeln(PROMPT + cmd);
          history.push(cmd);
          hIndex = null;
          handleCommand(cmd);
          buffer = '';
        } else if (ch === '\u007F') {
          // backspace
          if (buffer.length > 0) {
            buffer = buffer.slice(0, -1);
            term.write('\b \b');
          }
        } else if (ch === '\t') {
          // tab autocomplete
          const match = availableCommands.find(c => c.startsWith(buffer));
          if (match) {
            const rest = match.slice(buffer.length);
            buffer = match + ' ';
            term.write(rest + ' ');
          }
        } else if (ch === '\x03') {
          // ctrl+c
          term.write('^C');
          buffer = '';
          showPrompt();
        } else {
          buffer += ch;
          term.write(ch);
        }
      }
    });

    function handleCommand(raw: string) {
      const parts = raw.split(/\s+/);
      const name = parts[0];
      const args = parts.slice(1);

      switch (name) {
        case 'help':
          writeLines(['Available commands:', 'help, about, skills, projects, contact, github, open <path>, echo, date, clear, whoami, ls, build']);
          showPrompt();
          break;
        case 'about':
          writeLines(['Lavansh Choubey - Frontend engineer & creative coder.', 'I build interactive web experiences with React, Three.js and Tailwind.']);
          showPrompt();
          break;
        case 'skills':
          writeLines(['React, TypeScript, Vite, TailwindCSS, Framer Motion, three.js, @react-three/fiber, gsap']);
          showPrompt();
          break;
        case 'projects':
          writeLines(['Project Vault — interactive project gallery with 3D previews', 'Neural Bridge — contact/interaction UI with animated effects']);
          showPrompt();
          break;
        case 'contact':
          writeLines(['Open /contact to view contact options']);
          showPrompt();
          break;
        case 'github':
          writeLines(['Opening GitHub profile...']);
          window.open('https://github.com/lavansh1306', '_blank');
          showPrompt();
          break;
        case 'echo':
          writeLines(args.join(' '));
          showPrompt();
          break;
        case 'date':
          writeLines(new Date().toString());
          showPrompt();
          break;
        case 'clear':
          term.clear();
          showPrompt();
          break;
        case 'whoami':
          writeLines('Lavansh Choubey');
          showPrompt();
          break;
        case 'open':
          if (args.length === 0) { writeLines('Usage: open <path>'); showPrompt(); break; }
          const path = args[0];
          if (path.startsWith('/')) {
            writeLines(`Navigating to ${path} ...`);
            setTimeout(() => navigate(path), 200);
          } else if (path.startsWith('http')) {
            writeLines(`Opening ${path} ...`); window.open(path, '_blank');
          } else writeLines('open: unsupported path.');
          showPrompt();
          break;
        case 'ls':
          writeLines('public/  src/  package.json  README.md'); showPrompt(); break;
        case 'build':
          writeLines('Starting simulated build...');
          setTimeout(() => { writeLines(['vite building...', '✓ build completed in 1.2s']); showPrompt(); }, 800);
          break;
        default:
          writeLines(`Command not found: ${name}. Type 'help'.`); showPrompt();
      }
    }

    function onResize() { fit.fit(); }
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      term.dispose();
    };
  }, [navigate]);

  return (
    <div className="terminal-window" style={{ minHeight: '60vh' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
