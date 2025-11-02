import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MatrixCanvas from "../components/MatrixCanvas";

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
            "whoami - show placeholder user",
            "ls - list top-level files/folders (demo)",
            "build - simulate a build log",
          ]);
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
          push("guest@local")
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
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 relative overflow-hidden">
      {/* matrix canvas background */}
      <MatrixCanvas />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-mono">Inbuilt Terminal</h1>
          <div className="text-sm">
            <Link to="/" className="underline">Back</Link>
          </div>
        </div>

        <div className="relative z-10">
          <div
            ref={containerRef}
            className="bg-black/70 backdrop-blur-sm rounded-md p-4 font-mono text-green-200 h-[60vh] overflow-auto border border-slate-700"
          >
          {lines.length === 0 && (
            <div className="opacity-60">(empty)</div>
          )}
          {lines.map((l, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {l}
            </div>
          ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-green-300">{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none border-b border-slate-700 py-1 px-2 font-mono"
              placeholder="type a command and press Enter"
              autoFocus
            />
            <button
              type="submit"
              className="ml-2 rounded bg-slate-800 px-3 py-1 text-sm border border-slate-700"
            >
              Run
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
