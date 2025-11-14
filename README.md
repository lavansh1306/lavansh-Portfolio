
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

