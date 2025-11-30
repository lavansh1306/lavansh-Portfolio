import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Analytics } from '@vercel/analytics/react'
import { ParallaxProvider } from 'react-scroll-parallax'

const root = createRoot(document.getElementById('root')!);

root.render(
  <ParallaxProvider>
    <App />
    {process.env.NODE_ENV === 'production' && typeof Analytics !== 'undefined' ? <Analytics /> : null}
    {/* DevTools protections removed to allow opening browser DevTools with shortcuts */}
  </ParallaxProvider>
);
