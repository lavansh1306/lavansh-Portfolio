import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Analytics } from '@vercel/analytics/react'
import installDevtoolsProtections from './lib/devtools-protect'

const root = createRoot(document.getElementById('root')!);

root.render(
	<>
			<App />
			{process.env.NODE_ENV === 'production' && typeof Analytics !== 'undefined' ? <Analytics /> : null}
			{/* Install lightweight devtools protections (deterrent only) */}
			{typeof window !== 'undefined' ? (installDevtoolsProtections(), null) : null}
	</>
);
