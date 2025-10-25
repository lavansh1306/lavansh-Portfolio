import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Analytics } from '@vercel/analytics/react'

const root = createRoot(document.getElementById('root')!);

root.render(
	<>
		<App />
		{process.env.NODE_ENV === 'production' && typeof Analytics !== 'undefined' ? <Analytics /> : null}
	</>
);
