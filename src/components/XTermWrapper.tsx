import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import '../styles/cyberpunk.css';
import { useNavigate } from 'react-router-dom';
import { Linkedin } from 'lucide-react';

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
    // dynamically load addons so the editor doesn't error before `npm install`
    // store loaded addons so we can dispose them cleanly on unmount
    const loadedAddons: any[] = [];
    (async () => {
      let fit: any = null;
      try {
        const fitModule = await import('xterm-addon-fit');
        fit = new fitModule.FitAddon();
        term.loadAddon(fit);
        fitRef.current = fit;
        loadedAddons.push(fit);
      } catch (e) {
        console.warn('xterm-fit addon not available:', e);
      }

      try {
        // Only load the web-links addon if the terminal exposes a link API
        // (older/newer xterm versions differ in which method exists).
        const hasRegisterLinkMatcher = typeof (term as any).registerLinkMatcher === 'function';
        const hasRegisterLinkProvider = typeof (term as any).registerLinkProvider === 'function';
        if (!hasRegisterLinkMatcher && !hasRegisterLinkProvider) {
          console.info('xterm web-links not loaded: terminal lacks link API');
        } else {
          const webLinksModule = await import('xterm-addon-web-links');
          const webLinks = new webLinksModule.WebLinksAddon();
          term.loadAddon(webLinks);
          loadedAddons.push(webLinks);
        }
      } catch (e) {
        console.warn('xterm-web-links addon not available or failed to initialize:', e);
      }

      try {
        const searchModule = await import('xterm-addon-search');
        const search = new searchModule.SearchAddon();
        term.loadAddon(search);
        loadedAddons.push(search);
      } catch (e) {
        console.warn('xterm-search addon not available:', e);
      }
    })();
    termRef.current = term;

    if (containerRef.current) {
      term.open(containerRef.current);
      // give browser a moment to layout, then fit if addon loaded
      setTimeout(() => { if (fitRef.current && typeof fitRef.current.fit === 'function') fitRef.current.fit(); }, 50);
    }

    // simple prompt buffer
    let buffer = '';
    let history: string[] = [];
    let hIndex: number | null = null;

    const availableCommands = [
      'help','echo','Linkedin','date','clear','whoami','ls','build','about','skills','projects','contact','github','open','devtools','devtools-on','devtools-off'
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
          writeLines(['Available commands:', 'help, linkedin, about, skills, projects, contact, github, open <path>, echo, date, clear, whoami, ls, build']);
          showPrompt();
          break;
        case 'about':
          writeLines(['Lavansh Choubey - Full stack Developer & Ideator.', 'I build interactive tools for real world impact']);
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
          writeLines(['Connect on linkedin or Github']);
          showPrompt();
          break;
        case 'github':
          writeLines(['Opening GitHub profile...']);
          window.open('https://github.com/lavansh1306', '_blank');
          showPrompt();
          break;
           case 'linkedin':
          writeLines(['Opening linkedin profile...']);
          window.open('https://www.linkedin.com/in/lavansh-choubey-683355314/', '_blank');
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
        case 'who_am_i':
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
        case 'devtools':
          writeLines(["DevTools instructions:",
            " - Windows/Linux: Press Ctrl+Shift+I or F12",
            " - macOS: Press Cmd+Option+I",
            "If keyboard shortcuts are blocked, run 'devtools-off' to disable the page deterrent (if present)."]);
          showPrompt();
          break;
        case 'devtools-on':
          writeLines('Enabling lightweight devtools protections...');
          try {
            // dynamically import the protections module and install
            import('../lib/devtools-protect').then(m => {
              const cleanup = m.default();
              // store cleanup on window so it can be removed later
              (window as any).__devtoolsProtectionCleanup = cleanup;
              writeLines('Devtools protections enabled.');
              showPrompt();
            }).catch(e => { writeLines('Failed to enable protections: ' + String(e)); showPrompt(); });
          } catch (e) {
            writeLines('Error enabling protections: ' + String(e)); showPrompt();
          }
          break;
        case 'devtools-off':
          writeLines('Disabling devtools protections (if active)...');
          try {
            const cleanup = (window as any).__devtoolsProtectionCleanup;
            if (typeof cleanup === 'function') {
              cleanup();
              delete (window as any).__devtoolsProtectionCleanup;
              writeLines('Devtools protections disabled. You can now use DevTools shortcuts.');
            } else {
              writeLines('No active devtools protections were found.');
            }
          } catch (e) {
            writeLines('Error disabling protections: ' + String(e));
          }
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

  function onResize() { if (fitRef.current && typeof fitRef.current.fit === 'function') fitRef.current.fit(); }
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      // dispose loaded addons if they expose dispose
      try {
        // attempt graceful addon disposal
        // fitRef.current may be present and included in loadedAddons
        for (const a of (loadedAddons as any[])) {
          try {
            if (a && typeof a.dispose === 'function') a.dispose();
          } catch (ae) {
            // ignore per-addon disposal errors
          }
        }
      } catch (e) {
        // swallow
      }
      term.dispose();
    };
  }, [navigate]);

  return (
    <div className="terminal-window" style={{ minHeight: '60vh' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
