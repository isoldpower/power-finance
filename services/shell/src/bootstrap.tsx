import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'

const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('Root element not found');
if (!rootElement.innerHTML) {
	const root = createRoot(rootElement)
	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
