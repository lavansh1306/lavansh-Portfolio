<div align="center">

# 🌐 Cyberpunk Developer Portfolio

![CI](https://github.com/lavansh1306/lavansh-Portfolio/workflows/CI/badge.svg?style=for-the-badge)
![Status](https://img.shields.io/badge/SYSTEM-ONLINE-00ff41?style=for-the-badge&logo=voidlinux&logoColor=white)
![Version](https://img.shields.io/badge/VERSION-2.0.4-00d9ff?style=for-the-badge)
![License](https://img.shields.io/badge/LICENSE-MIT-ffd700?style=for-the-badge)

**A next-generation developer portfolio with dual-interface experience: holographic GUI and functional xterm.js terminal**

[View Live](https://lavansh.vercel.app) • [Report Bug](https://github.com/lavansh1306/lavansh-Portfolio/issues) • [Request Feature](https://github.com/lavansh1306/lavansh-Portfolio/issues)

</div>

---

## ✨ Features

🎯 **Dual Interface** - Seamlessly switch between GUI and terminal modes  
🎨 **Cyberpunk Aesthetics** - Immersive holographic visuals with glitch effects  
⚡ **Performance Optimized** - Built with Vite + React for blazing-fast load times  
📱 **Fully Responsive** - Pixel-perfect experience across all devices  
🔧 **Interactive Terminal** - Fully functional xterm.js with custom commands  
📬 **Contact Form** - Email integration powered by FastAPI + Resend  
🌓 **Theme Support** - Dynamic theme switching with next-themes  
♿ **Accessible** - WCAG compliant with Radix UI primitives

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn/UI](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white)

### Animation & Graphics
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Xterm.js](https://img.shields.io/badge/Xterm.js-000000?style=for-the-badge&logo=gnometerminal&logoColor=white)

### Backend
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Uvicorn](https://img.shields.io/badge/Uvicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=minutemailer&logoColor=white)

### DevOps & Tools
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

---

## 📂 Project Structure

```text
lavansh-Portfolio/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route-level pages
│   ├── hooks/           # Custom React hooks
│   ├── styles/          # Global styles & theme
│   ├── lib/             # Utilities & helpers
│   └── types/           # TypeScript definitions
├── backend/
│   ├── app.py           # FastAPI application
│   ├── send_email.py    # Email service logic
│   └── requirements.txt # Python dependencies
├── public/              # Static assets
└── package.json         # Node dependencies
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- Python 3.8+
- Git

### Frontend Setup

```bash
# Clone repository
git clone https://github.com/lavansh1306/lavansh-Portfolio.git
cd lavansh-Portfolio

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

Visit `http://localhost:5173` to view the portfolio.

### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "RESEND_API_KEY=your_api_key_here" > .env
echo "FRONTEND_ORIGINS=http://localhost:5173" >> .env

# Start server
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

Backend runs on `http://localhost:8000`

---

## 🏗️ Build & Deployment

### Frontend (Vercel)

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The frontend is automatically deployed to Vercel on push to `main` branch.

### Backend (Render)

The backend is configured for Render deployment via `render.yaml`. Set environment variables in Render dashboard:
- `RESEND_API_KEY` - Your Resend API key
- `FRONTEND_ORIGINS` - Your Vercel frontend URL

---

## 🔧 Development Workflow

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint for code quality |

### Code Quality

```bash
# Run linter
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

---

## 🎨 Key Technologies

**Frontend**: React 18 with TypeScript for type safety and maintainability  
**Styling**: Tailwind CSS + shadcn/ui for rapid UI development  
**Animations**: Framer Motion + GSAP for smooth, performant animations  
**3D Graphics**: Three.js + React Three Fiber for WebGL experiences  
**Terminal**: xterm.js with custom command system  
**Routing**: React Router v6 for client-side navigation  
**State Management**: React Query for server state, Context API for UI state  
**Backend**: FastAPI (Python) for email API with Resend integration  

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## 📬 Contact

**Lavansh** - [@lavansh_dev](https://twitter.com/lavansh_dev)

Project Link: [https://github.com/lavansh1306/lavansh-Portfolio](https://github.com/lavansh1306/lavansh-Portfolio)

---

<div align="center">

**Built with 💻 and ⚡ by Lavansh**

⭐ Star this repo if you find it helpful!

</div>
