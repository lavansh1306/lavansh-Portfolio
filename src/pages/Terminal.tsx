import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MatrixCanvas from "../components/MatrixCanvas";
import XTermWrapper from "../components/XTermWrapper";

const PROMPT = "$";

const defaultWelcome = [
  "Welcome to the inbuilt terminal.",
  "Type 'help' to see available commands.",
];

export default function Terminal() {
  const [lines, setLines] = useState<string[]>(defaultWelcome);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const availableCommands = [
    'help','echo','date','clear','whoami','ls','build','about','skills','projects','contact','github','open'
  ];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // scroll to bottom when lines change
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight });
  }, [lines]);

  const push = useCallback((text: string | string[]) => {
    setLines((l) => l.concat(Array.isArray(text) ? text : [text]));
  }, []);

  const runCommand = useCallback(
    async (raw: string) => {
      const cmd = raw.trim();
      if (!cmd) return;
      push(`${PROMPT} ${cmd}`);
      setHistory((h) => [...h, cmd]);
      setHIndex(null);

      const [name, ...args] = cmd.split(/\s+/);

      switch (name) {
        case "help":
          push([
            "Available commands:",
            "help - show this help",
            "echo <text> - print text",
            "date - current date/time",
            "clear - clear the screen",
            "whoami - show user identity",
            "ls - list top-level files/folders (demo)",
            "build - simulate a build log",
            "about - short bio",
            "skills - list main skills",
            "projects - list notable projects",
            "contact - show contact hint",
            "github - open GitHub profile",
            "open <path> - navigate to a site route (e.g. open /contact)",
          ]);
          break;
        case "about":
          push([
            "Lavansh Choubey - Frontend engineer & creative coder.",
            "I build interactive web experiences with React, Three.js and Tailwind.",
            "Type 'skills' to see technologies or 'projects' to list examples.",
          ]);
          break;
        case "skills":
          push([
            "Frontend: React, TypeScript, Vite, TailwindCSS, Framer Motion",
            "3D & Graphics: three.js, @react-three/fiber, gsap",
            "Tools: Git, Vercel, Node.js, vite, eslint",
          ]);
          break;
        case "projects":
          push([
            "Project Vault — interactive project gallery with 3D previews",
            "Neural Bridge — contact/interaction UI with animated effects",
            "Matrix Canvas — site-wide matrix/particle visuals",
          ]);
          break;
        case "contact":
          push([
            "For contact options see the Contact page:",
            "open /contact",
          ]);
          break;
        case "github":
          push(["Opening GitHub profile..."]);
          // open GitHub in new tab
          window.open("https://github.com/lavansh1306", "_blank");
          break;
        case "echo":
          push(args.join(" ") || "");
          break;
        case "date":
          push(new Date().toString());
          break;
        case "clear":
          setLines([]);
          break;
        case "whoami":
          push("Lavansh Choubey")
          break;
        case "open":
          if (args.length === 0) {
            push("Usage: open <path>");
            break;
          }
          const path = args[0];
          if (path.startsWith("/")) {
            push(`Navigating to ${path} ...`);
            // small delay to show message then navigate
            setTimeout(() => navigate(path), 250);
          } else if (path.startsWith("http")) {
            push(`Opening ${path} ...`);
            window.open(path, "_blank");
          } else {
            push("open: unsupported path. Use /route or full http URL.");
          }
          break;
          break;
        case "ls":
          push(["public/  src/  package.json  README.md"]);
          break;
        case "build":
          push("Starting simulated build...");
          await new Promise((r) => setTimeout(r, 700));
          push(["vite building...", "✓ build completed in 1.2s"]);
          break;
        default:
          push(`Command not found: ${name}. Type 'help'.`);
      }
    },
    [push]
  );

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const value = input;
    setInput("");
    runCommand(value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // history navigation
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      setHIndex((prev) => {
        const next = prev === null ? history.length - 1 : Math.max(0, prev - 1);
        setInput(history[next]);
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0) return;
      setHIndex((prev) => {
        if (prev === null) return null;
        const next = Math.min(history.length - 1, prev + 1);
        setInput(history[next] || "");
        return next === history.length - 1 ? null : next;
      });
    } else if (e.key === 'Tab') {
      // simple autocomplete: complete to first available command
      e.preventDefault();
      const prefix = input.trim();
      if (!prefix) return;
      const match = availableCommands.find(c => c.startsWith(prefix));
      if (match) setInput(match + ' ');
    } else if (e.key.toLowerCase() === 'l' && (e.ctrlKey || e.metaKey)) {
      // Ctrl+L: clear screen
      e.preventDefault();
      setLines([]);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 relative overflow-hidden">
      {/* matrix canvas background */}
      <MatrixCanvas />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-mono">Inbuilt Terminal</h1>
          <button
            onClick={() => {
              // Always go to the home page. Set 'visited' so the boot sequence will skip.
              try {
                sessionStorage.setItem('visited', 'true');
              } catch (e) {
                // ignore storage errors
              }
              navigate('/', { replace: true });
              // ensure top of page
              try { window.scrollTo(0, 0); } catch (e) {}
            }}
            className="font-mono text-[#00ff41] cursor-pointer hover:text-white hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.8)] transition-all duration-300 text-sm"
            aria-label="Back to system"
          >
            [ &lt; Back_to_System ]
          </button>
        </div>

        <div className="relative z-10">
          <XTermWrapper />
        </div>
      </div>
    </div>
  );
}
