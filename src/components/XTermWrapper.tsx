import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import type { ITerminalAddon } from 'xterm';
import 'xterm/css/xterm.css';
import '../styles/cyberpunk.css';
import { useNavigate } from 'react-router-dom';

const PROMPT = '$ ';

export default function XTermWrapper() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const termRef = useRef<Terminal | null>(null);
  const fitRef = useRef<any | null>(null);
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

    (async () => {
      try {
        const fitModule = await import('xterm-addon-fit');
        const fit = new fitModule.FitAddon() as unknown as ITerminalAddon;
        term.loadAddon(fit);
        fitRef.current = fit;
      } catch (e) {
        // ignore if addon can't be loaded or types mismatch
      }
    })();

    termRef.current = term;

    if (containerRef.current) {
      term.open(containerRef.current);
      setTimeout(() => fitRef.current?.fit?.(), 50);
    }

    let buffer = '';

    // RECRUITER-READY COMMAND SET
    const commands = [
      'help',
      'about',
      'skills',
      'projects',
      'contact',
      'linkedin',
      'github',
      'open <path>',
      'clear',
      'date',
      'ls'
    ];

    function showPrompt() {
      term.write('\r\n' + PROMPT);
    }

    // Minimal recruiter-friendly intro
    const hints = [
      [{ text: 'Welcome — navigate my portfolio using simple terminal commands.', color: '\x1b[35m' }],
      [{ text: 'Try:' }],
        [{ text: ' • about ', color: '\x1b[32m' }, { text: ' -- who am i', color: '\x1b[90m' } ],
        [{ text: ' • skills ', color: '\x1b[32m' }, { text: ' — my tech stack', color: '\x1b[90m' } ],
        [{ text: ' • contact ', color: '\x1b[32m' }, { text: ' — reach out', color: '\x1b[90m' } ],
    ];

    const timeouts: number[] = [];

    function typeLine(parts: any[], idx: number, done: () => void) {
      if (idx >= parts.length) return done();
      const { text, color } = parts[idx];
      if (color) term.write(color);
      let i = 0;

      function nextChar() {
        if (i < text.length) {
          term.write(text[i++]);
          timeouts.push(window.setTimeout(nextChar, 18));
        } else {
          if (color) term.write('\x1b[0m');
          term.writeln('');
          typeLine(parts, idx + 1, done);
        }
      }
      nextChar();
    }

    function showHints() {
      let line = 0;
      function next() {
        if (line >= hints.length) return showPrompt();
        typeLine(hints[line], 0, () => timeouts.push(window.setTimeout(next, 100)));
        line++;
      }
      next();
    }

    showHints();

    term.onData((data) => {
      for (let j = 0; j < data.length; j++) {
        const ch = data[j];
        if (ch === '\r') {
          const cmd = buffer.trim();
          term.writeln('');
          term.writeln(PROMPT + cmd);
          handleCommand(cmd);
          buffer = '';
        } else if (ch === '\u007F') {
          if (buffer.length > 0) {
            buffer = buffer.slice(0, -1);
            term.write('\b \b');
          }
        } else if (ch === '\x03') {
          // ctrl+c
          term.write('^C');
          buffer = '';
          showPrompt();
        } else if (ch === '\t') {
          // tab autocomplete
          const match = commands.find(c => c.startsWith(buffer));
          if (match) {
            const rest = match.slice(buffer.length);
            buffer = match + ' ';
            term.write(rest + ' ');
          }
        } else {
          buffer += ch;
          term.write(ch);
        }
      }
    });

    function handleCommand(raw: string) {
      const parts = raw.split(/\s+/);
      const cmd = parts[0];
      const args = parts.slice(1);

      switch (cmd) {

        // ---------------- HELP -----------------
        case 'help':
          term.writeln('\x1b[36mAvailable commands:\x1b[0m');
          commands.forEach(c => term.writeln(' • ' + c));
          showPrompt();
          break;

        // ---------------- ABOUT ----------------
        case 'about':
          term.writeln('\x1b[36mAbout Me:\x1b[0m');
          term.writeln('I’m Lavansh Choubey — a full-stack developer focused on UI engineering and AI tooling.');
          term.writeln('I build fast interfaces, practical AI assistants, and real-world product systems.');
          showPrompt();
          break;

        // ---------------- SKILLS ----------------
        case 'skills':
          term.writeln('\x1b[36mSkills:\x1b[0m');
          term.writeln('Frontend: React, Next.js, TypeScript, TailwindCSS, Framer Motion, R3F');
          term.writeln('Backend: Python, Flask, FastAPI, MongoDB, Supabase');
          term.writeln('AI/Automation: OCR (PaddleOCR, TrOCR), RAG, Gemini/OpenAI APIs');
          showPrompt();
          break;

        // ---------------- PROJECTS ----------------
        case 'projects':
          term.writeln('\x1b[36mHighlighted Projects:\x1b[0m');
          term.writeln(' • Project Vault — 3D interactive showcase built with R3F');
          term.writeln(' • OCR Assistant — AI-powered prescription & text extraction tool');
          showPrompt();
          break;

        // ---------------- CONTACT ----------------
        case 'contact':
          term.writeln('\x1b[36mContact:\x1b[0m');
          term.writeln('Email: lavansh1306@gmail.com');
          term.writeln('LinkedIn: use `linkedin`');
          term.writeln('GitHub: use `github`');
          showPrompt();
          break;

        // ---------------- SOCIAL LINKS ----------------
        case 'linkedin':
          term.writeln('Opening LinkedIn...');
          window.open('https://www.linkedin.com/in/lavansh-choubey-683355314/', '_blank');
          showPrompt();
          break;

        case 'github':
          term.writeln('Opening GitHub...');
          window.open('https://github.com/lavansh1306', '_blank');
          showPrompt();
          break;

        // ---------------- UTILITIES ----------------
        case 'date':
          term.writeln(new Date().toString());
          showPrompt();
          break;

        case 'ls':
          term.writeln('src/   public/   assets/   README.md');
          showPrompt();
          break;

        case 'open':
          if (!args[0]) { term.writeln('Usage: open <path>'); showPrompt(); break; }
          if (args[0].startsWith('/')) navigate(args[0]);
          else if (args[0].startsWith('http')) window.open(args[0], '_blank');
          else term.writeln('open: unsupported path.');
          showPrompt();
          break;

        case 'clear':
          term.clear();
          showPrompt();
          break;

        case 'build':
          term.writeln('vite building...');
          setTimeout(() => term.writeln('✓ build completed'), 500);
          showPrompt();
          break;

        // ---------------- UNKNOWN ----------------
        default:
          term.writeln(`Command not found: ${cmd}. Try 'help'.`);
          showPrompt();
      }
    }

    window.addEventListener('resize', () => {
      if (fitRef.current?.fit) fitRef.current.fit();
    });

    return () => {
      try { for (const t of timeouts) clearTimeout(t); } catch (e) { /* ignore */ }
      try { fitRef.current?.dispose?.(); } catch (e) { /* ignore */ }
      term.dispose();
    };
  }, [navigate]);

  return (
    <div className="terminal-window" style={{ minHeight: '60vh' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
