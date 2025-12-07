
# Lavansh Choubey — Portfolio

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![Vercel](https://img.shields.io/badge/deploy-vercel-black?logo=vercel)](https://vercel.com)

A modern, interactive personal portfolio website showcasing projects, achievements, and interactive experiences. Features a built-in terminal, 3D visuals, and smooth animations.

## Quick Links
- **Live site**: https://lavansh-portfolio-7i5p.vercel.app/
- **Resume**: https://drive.google.com/file/d/1Bq2aMXg6kc84LU1xtnYoe6n_7mNlNRpU/view?usp=sharing
- **GitHub**: https://github.com/lavansh1306
- **Email**: reach out via GitHub profile

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
- [Terminal Usage](#terminal-usage)
- [Deployment](#deployment)
- [Contributing & License](#contributing--license)
- [Contact & Links](#contact--links)

## About

This portfolio showcases my projects, achievements, skills, and interactive experiences. Built with modern web technologies, it features:
- Interactive project gallery with 3D previews
- Built-in terminal emulator (xterm.js) with custom commands
- Smooth animations and particle effects
- Responsive design with Tailwind CSS
- Real-time loading sequences and visual polish

## Features

### 🖥️ Built-in Terminal
- Full xterm.js integration at `/terminal`
- Custom commands: `about`, `skills`, `projects`, `contact`, `github`, `open`
- Tab autocomplete, command history, Ctrl+L clear
- Web links addon support and optional WebGL rendering
- Beautiful cyberpunk-themed UI with Matrix effects

### 🎨 Visual Experience
- Matrix-style canvas background
- Smooth loading sequences with skip-on-keypress
- 3D project previews using Three.js
- Framer Motion animations
- Responsive and accessible UI

### 🚀 Performance
- Optimized with Vite for fast builds
- Vercel deployment with zero-config
- GitHub Pages deployment support
- Production-ready build configuration

## Technologies

### Frontend
- **Vite** — Next-generation build tool
- **React 18** + TypeScript — UI and type safety
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Smooth animations

### 3D & Graphics
- **three.js** — 3D rendering
- **@react-three/fiber** — React renderer for Three.js
- **Canvas API** — Custom graphics (Matrix effect, particles)

### Terminal & Interactivity
- **xterm.js** — Full terminal emulation
- **xterm-addon-fit** — Terminal resizing
- **xterm-addon-web-links** — Clickable links in terminal
- **xterm-addon-search** — Terminal search capability
- **xterm-addon-webgl** — WebGL rendering (optional)

### UI & Components
- **shadcn/ui** — High-quality component library
- **Radix UI** — Accessible primitives
- **react-router-dom** — Client-side routing

### Other
- **GSAP** — Advanced animations
- **Recharts** — Data visualization
- **Formspree** — Form handling
- **Vercel Analytics** — Performance monitoring

### Terminal Usage

Visit `/terminal/launch` (or click "Open Terminal" on home page) to access the built-in terminal:

```sh
# Available commands:
help              # Show all commands
about             # About me
skills            # My technical skills
projects          # My projects
contact           # Contact information
github            # Open my GitHub profile
open <path>       # Navigate to a page or external URL
echo <text>       # Echo text
date              # Show current date
clear             # Clear terminal
whoami            # Show username
ls                # List directory
build             # Simulate a build
```

**Example:**
```sh
$ about
Lavansh Choubey - Frontend engineer & creative coder...

$ open /portfolio
Navigating to /portfolio ...

$ github
Opening GitHub profile...
```

## Getting Started

### Prerequisites
- Node.js 18+ recommended
- npm, yarn, or bun package manager

### Local Development

1. Clone and install:
```sh
git clone https://github.com/lavansh1306/lavansh-Portfolio.git
cd lavansh-Portfolio
npm install
```

2. Run dev server:
```sh
npm run dev
# Open http://localhost:5173 (or the port shown)
```

3. Build for production:
```sh
npm run build
```

4. Preview production build:
```sh
npm run preview
```

## Deployment

Available npm scripts:

```sh
npm run dev          # Start dev server with hot reload
npm run build        # Production build (output in dist/)
npm run build:dev    # Development build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint checks
```

## Configuration

- **Vite** — `vite.config.ts`
- **TypeScript** — `tsconfig.json`
- **Tailwind** — `tailwind.config.ts`
- **ESLint** — `eslint.config.js`
- **PostCSS** — `postcss.config.js`

## Contributing & License

This is a personal portfolio. Feel free to use this repo as inspiration for your own portfolio!

- **License**: MIT (see `LICENSE` file)
- **Author**: Lavansh Choubey
- **Repository**: https://github.com/lavansh1306/lavansh-Portfolio

### Third-party Licenses

This project uses many open-source packages. Please review their licenses:
- React, Vite, Tailwind CSS, Three.js, Framer Motion, and others are all open-source
- Check `package.json` for a full list of dependencies
- License information for each package can be found in `node_modules/<package>/LICENSE`

## Contact & Links

- **GitHub**: https://github.com/lavansh1306
- **Portfolio**: https://lavansh-portfolio-7i5p.vercel.app
- **Resume**: https://drive.google.com/file/d/1Bq2aMXg6kc84LU1xtnYoe6n_7mNlNRpU/view?usp=sharing

---

**Portfolio maintained by Lavansh Choubey** | Built with ❤️ using React, Three.js, and TypeScript

Last updated: 2025-11-18
 
---

## Project README (Comprehensive)

This README aims to be a single, comprehensive source of truth for this portfolio project. It documents: features, terminal usage, local setup, build & deployment, architecture, testing, contribution guidance, release notes, troubleshooting, and more. Use the Table of Contents below to jump to the section you need.

## Badges
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Vercel](https://img.shields.io/badge/deploy-vercel-black?logo=vercel)

## Table of Contents
- [About](#about)
- [Quick Links](#quick-links)
- [Features](#features)
	- [Built-in Terminal](#built-in-terminal)
	- [Visuals & 3D](#visuals--3d)
- [Getting Started](#getting-started)
	- [Prerequisites](#prerequisites)
	- [Install](#install)
	- [Run Locally](#run-locally)
	- [Build & Preview](#build--preview)
- [Project Structure](#project-structure)
- [Detailed Component Notes](#detailed-component-notes)
- [Commands & Terminal Reference](#commands--terminal-reference)
- [Deployment](#deployment)
	- [Vercel](#vercel)
	- [GitHub Pages (optional)](#github-pages-optional)
- [CI / GitHub Actions](#ci--github-actions)
- [Testing & Linting](#testing--linting)
- [Troubleshooting & FAQ](#troubleshooting--faq)
- [Contributing](#contributing)
- [Changelog / Releases](#changelog--releases)
- [License & Credits](#license--credits)
- [Contact](#contact)

## About

Lavansh Choubey — personal portfolio built as a modern, interactive site demonstrating frontend engineering and creative coding. The site focuses on strong visuals (3D, particle effects), accessibility, and a playful in-site terminal experience for visitors.

## Quick Links
- Live site: https://lavansh-portfolio-7i5p.vercel.app/
- Repo: https://github.com/lavansh1306/lavansh-Portfolio
- Resume: https://drive.google.com/file/d/1Bq2aMXg6kc84LU1xtnYoe6n_7mNlNRpU/view?usp=sharing

## Features

- Interactive Project Vault with 3D previews and shaders
- Built-in terminal emulator with custom commands and keyboard UX
- Matrix-style canvas background and glowy cyberpunk theme
- Smooth loading sequences and visual polish (skip-on-keypress)
- Responsive design and accessible components via Radix UI and shadcn
- Integrations: xterm.js, three.js, @react-three/fiber, Framer Motion

### Built-in Terminal

- Route: `/terminal` (direct) and `/terminal/launch` (loader)
- Features:
	- xterm.js integration (core terminal emulation)
	- Addons: Fit, WebLinks, Search, optional WebGL rendering
	- Custom commands: `about`, `skills`, `projects`, `contact`, `github`, `open`, `echo`, `date`, `clear`, `whoami`, `ls`, `build`
	- UX: tab autocomplete, command history (ARROW keys), Ctrl+L to clear, double-click to copy output
	- Visual: Matrix background via `MatrixCanvas`, compact loader via `TerminalBoot`

### Visuals & 3D

- `MatrixCanvas.tsx` — custom canvas animation with falling characters
- `ProjectVault` and project previews leverage `three.js` and `@react-three/fiber` for 3D models and shaders
- `TerminalBoot.tsx` — compact boot sequence with optional shader/particle burst when moving into terminal

## Getting Started

These instructions help you run and iterate on the project locally.

### Prerequisites

- Node.js 18+ recommended
- npm, yarn, or bun (you may prefer bun for speed)
- Optional: `pnpm` if you prefer

### Install

Clone and install dependencies:

```sh
git clone https://github.com/lavansh1306/lavansh-Portfolio.git
cd lavansh-Portfolio
npm install
# or with bun
# bun install
```

### Run Locally (development)

```sh
npm run dev
# Visit http://localhost:5173
```

### Build & Preview (production)

```sh
npm run build
npm run preview
```

## Project Structure

Top-level layout (key files only):

```
.
├── public/                           # static assets
│   └── robots.txt
├── src/
│   ├── components/                   # UI & Interactive Components
│   │   ├── AboutDossier.tsx         # About section with dossier-style layout
│   │   ├── AchievementShowcase.tsx  # Hackathon wins with horizontal scroller
│   │   ├── BootSequence.tsx         # Loading animation sequence
│   │   ├── ContactForm.tsx          # Email form (Formspree + Resend API)
│   │   ├── CyberCursor.tsx          # Custom cyberpunk cursor effect
│   │   ├── CyberGrid.tsx            # Background grid pattern
│   │   ├── ExpandableInternshipCard.tsx  # Internship experience cards with tech stack
│   │   ├── Footer.tsx               # Site footer with contact links
│   │   ├── HologramAvatar.tsx       # Cyberpunk holographic avatar (octagon shape)
│   │   ├── HolomorphicCard.tsx      # Holographic card component (3D effect)
│   │   ├── HolographicNav.tsx       # Navigation with holographic styling
│   │   ├── InternshipShowcase.tsx   # Container for internship cards
│   │   ├── MainHero.tsx             # Hero section with name, tagline, resume button
│   │   ├── MainNav.tsx              # Primary navigation
│   │   ├── MatrixCanvas.tsx         # Matrix-style falling characters background
│   │   ├── NeuralBridge.tsx         # Email contact bridge/connector
│   │   ├── ParticleFieldSmall.tsx   # Small particle effect component
│   │   ├── ProjectShowcase.tsx      # Featured projects grid with tech stack
│   │   ├── ProjectVault.tsx         # Hackathon project showcase (ProjectVault page)
│   │   ├── SkillMatrix.tsx          # Technical skills with accordion & icons
│   │   ├── TerminalBoot.tsx         # Terminal boot sequence loader
│   │   ├── XTermWrapper.tsx         # xterm.js terminal wrapper
│   │   ├── animations/              # Animation/reveal components
│   │   │   ├── HorizontalScroller.tsx   # Scrollable container (achievements)
│   │   │   ├── ParallaxBackground.tsx   # Parallax scrolling effect
│   │   │   ├── RevealOnScroll.tsx       # Scroll-triggered animations
│   │   │   └── ScrollShowcase.tsx       # Scroll showcase wrapper
│   │   └── ui/                      # shadcn/ui Components (kept minimal)
│   │       ├── card.tsx             # Card wrapper component
│   │       ├── sonner.tsx           # Toast notifications
│   │       ├── motion.tsx           # Framer motion utilities
│   │       ├── button.tsx           # Button component
│   │       ├── input.tsx            # Input field
│   │       ├── checkbox.tsx         # Checkbox
│   │       ├── radio-group.tsx      # Radio group
│   │       ├── alert.tsx            # Alert component
│   │       ├── toaster.tsx          # Toast provider
│   │       └── toast.tsx            # Toast definitions
│   ├── pages/                       # Route Pages
│   │   ├── Index.tsx                # Home page (main portfolio)
│   │   ├── Contact.tsx              # Contact page with form
│   │   ├── Portfolio.tsx            # Project Vault page
│   │   ├── Terminal.tsx             # Terminal page
│   │   ├── TerminalLoader.tsx       # Terminal boot sequence
│   │   └── NotFound.tsx             # 404 page
│   ├── hooks/                       # Custom React Hooks
│   │   ├── use-mobile.tsx           # Mobile detection hook
│   │   ├── use-toast.ts             # Toast notification hook
│   │   ├── useGsapReveal.ts         # GSAP reveal animation hook
│   │   └── useHorizontalPinScroll.ts # Horizontal scroll pinning hook
│   ├── lib/                         # Utilities & Helpers
│   │   ├── animations.tsx           # Framer Motion animation presets
│   │   ├── devtools-protect.ts      # DevTools blocker/unlocker
│   │   ├── gsap-setup.ts            # GSAP configuration
│   │   └── utils.ts                 # Helper utilities
│   ├── styles/                      # Global & Component Styles
│   │   ├── cyberpunk.css            # Cyberpunk theme styles
│   │   ├── glitch.css               # Glitch effect animation
│   │   ├── holographic-nav.css      # Navigation styling
│   │   └── nav.module.css           # Navigation module styles
│   ├── plugins/                     # Browser Plugins/Scripts
│   │   └── block-injected-content.ts # Content injection blocker
│   ├── types/                       # TypeScript Type Definitions
│   │   ├── vercel-analytics.d.ts    # Vercel Analytics types
│   │   └── xterm-addons.d.ts        # xterm.js addon types
│   ├── App.tsx                      # Root app component
│   ├── App.css                      # Global app styles
│   ├── main.tsx                     # React entry point
│   ├── index.css                    # Global index styles
│   └── vite-env.d.ts                # Vite environment types
├── backend/                         # Backend Service (FastAPI)
│   ├── app.py                       # FastAPI app with /health, /send endpoints
│   ├── send_email.py                # Resend API email integration
│   ├── requirements.txt              # Python dependencies
│   └── README.md                    # Backend documentation
├── .github/
│   └── workflows/
│       └── gh-pages.yml             # GitHub Actions workflow (build & deploy)
├── public/                          # Static public assets
│   └── robots.txt
├── package.json                     # Node.js dependencies & scripts
├── bun.lockb                        # Bun lock file (if using bun)
├── tsconfig.json                    # TypeScript configuration
├── tsconfig.app.json                # App-specific TypeScript config
├── tsconfig.node.json               # Node-specific TypeScript config
├── vite.config.ts                   # Vite build configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── eslint.config.js                 # ESLint configuration
├── components.json                  # shadcn/ui configuration
├── CONTRIBUTING.md                  # Contribution guidelines
├── LICENSE                          # MIT License
└── README.md                        # This file

```

### Key Directories Explained

**`src/components/`** — All reusable UI components, organized by feature:
- Main layout: `MainHero`, `HolographicNav`, `CyberGrid`, `Footer`
- Content sections: `AboutDossier`, `SkillMatrix`, `InternshipShowcase`, `ProjectShowcase`, `AchievementShowcase`
- Interactive: `ContactForm`, `NeuralBridge`, `TerminalBoot`, `XTermWrapper`
- 3D/Visuals: `HologramAvatar`, `HolomorphicCard`, `MatrixCanvas`, `ParticleFieldSmall`
- Animations: `animations/` subfolder with scroll and parallax effects
- UI Library: `ui/` subfolder with shadcn/ui primitives (kept lean — only essential components)

**`src/pages/`** — Route-based pages:
- `/` → `Index.tsx` (main portfolio home)
- `/portfolio` → `Portfolio.tsx` (project vault)
- `/contact` → `Contact.tsx` (contact form page)
- `/terminal` → `Terminal.tsx` (full terminal)
- `/terminal/launch` → `TerminalLoader.tsx` (terminal loader)
- `/*` → `NotFound.tsx` (404 catch-all)

**`src/lib/`** — Reusable logic:
- `animations.tsx` — Framer Motion animation presets (`fadeInUp`, `staggerContainer`, etc.)
- `utils.ts` — Helper functions (classname merging, string utilities, etc.)
- `devtools-protect.ts` — DevTools enable/disable (for production control)
- `gsap-setup.ts` — GSAP animation library setup

**`src/hooks/`** — Custom React hooks:
- `useGsapReveal` — GSAP-based scroll reveal animations
- `useHorizontalPinScroll` — Horizontal pinned scroll (achievement section)
- `use-mobile` — Detect mobile viewport
- `use-toast` — Toast notification management

**`src/styles/`** — CSS modules and global styles:
- `cyberpunk.css` — Neon glow effects, theme colors
- `glitch.css` — Glitch text animation
- `holographic-nav.css` — Navigation holographic effect
- `nav.module.css` — Navigation layout styles

**`backend/`** — FastAPI Python backend:
- Deployed to Render
- Endpoints:
  - `GET /health` — Health check
  - `POST /send` — Send email via Resend API
- Environment: `RESEND_API_KEY`, `FRONTEND_ORIGINS` (CORS)

## Detailed Component Notes

- `XTermWrapper.tsx`
	- Wraps xterm.js Terminal instance
	- Loads addons dynamically (Fit, WebLinks, Search, WebGL) to avoid top-level import errors when packages are missing
	- Provides prompt, input handling, and command dispatch

- `TerminalBoot.tsx`
	- Compact boot/loader used by `/terminal/launch`
	- Plays timeline and optionally triggers particle burst before navigation

- `MatrixCanvas.tsx`
	- Lightweight canvas with optimized draw loop, devicePixelRatio aware

## Commands & Terminal Reference

Use the built-in terminal for a playful, informative experience. Type `help` to get a list inside the terminal. Key commands:

- `help` — shows available commands
- `about` — short bio
- `skills` — list of technical skills
- `projects` — top project summaries
- `contact` — contact instructions
- `github` — opens GitHub profile
- `open <path|http>` — navigate to internal route or open external URL
- `echo <text>` — echo text
- `date` — current date/time
- `clear` — clears terminal
- `whoami` — owner name
- `ls` — lightweight simulated listing
- `build` — simulated build output

Keyboard: Tab for autocomplete, ArrowUp/ArrowDown for history, Ctrl+L to clear, Space/Escape to skip loader.

## Deployment

### Vercel (recommended)

1. Import the repository into Vercel.
2. Use `npm run build` as the build command. Set Node version to 18+.
3. Deploy: Vercel will automatically deploy on pushes to `main` if linked.

### Backend (Render)

- The backend (`/backend`) is deployable to Render. It exposes a small health endpoint at `GET /health` and the email send endpoint at `POST /send`.
- When deploying to Render, set the environment variables `RESEND_API_KEY` (secret) and `FRONTEND_ORIGINS` (your Vercel URL) in the Render dashboard.
### GitHub Pages (optional)

This repository includes a GitHub Actions workflow that can publish to `gh-pages`. Steps:

1. Build locally with `npm run build`.
2. Use the included `.github/workflows/gh-pages.yml` to deploy automatically on push to `main`.
3. Site will be published at `https://lavansh1306.github.io/lavansh-Portfolio/` (if configured).

## CI / GitHub Actions

- The `gh-pages.yml` workflow builds and deploys the production output to GitHub Pages. It includes a debug step and is set to allow manual dispatch and empty commits for repeatable deployments.
- Add a status badge here when your workflow has a stable run URL.

## Testing & Linting

- ESLint: `npm run lint`
- Add unit/integration tests as needed — currently this project focuses on UI and visual features; add tests where you need code-level guarantees.

## Troubleshooting & FAQ

- Q: Editor shows "Cannot find module 'xterm'" or addon type errors?
	- A: Run `npm install` locally to install dependencies. A minimal `src/types/xterm-addons.d.ts` is included to provide safe typings until packages are installed.

- Q: Terminal UI broken after updates?
	- A: Restart the dev server and the TypeScript server in your editor. Verify `xterm` and addon packages are installed.

- Q: Build fails on CI with YAML error?
	- A: GitHub Actions can be sensitive to some shorthand keys. The workflow uses explicit `workflow_dispatch: {}` mapping to satisfy the validator.

## Contributing

Contributions are welcome but this is primarily a personal portfolio. If you want to adapt code for your portfolio, feel free to fork and create PRs for improvements.

Guidelines:

1. Open an issue describing the change before substantial refactors.
2. Keep commits small and focused.
3. Use descriptive commit messages and follow semantic commits where practical.
4. Ensure new dependencies are necessary and lightweight.

## Changelog / Releases

This repo does not currently maintain a formal release cadence. Use `git log --oneline` for a quick history. Consider adding tags and releases when you want to snapshot milestones.

## License & Credits

- License: MIT — see `LICENSE` file at the repo root.
- Design & code: Lavansh Choubey
- Third-party libraries: React, Vite, Tailwind, Framer Motion, three.js, xterm.js, and many more — check `package.json`.

## Contact

- GitHub: https://github.com/lavansh1306
- Portfolio: https://lavansh-portfolio-7i5p.vercel.app/

---

If you'd like further additions (automated API documentation, test harness, or a CONTRIBUTORS file), tell me what to include and I will add it.

