import './styles/index.css'

import { lazy, Suspense } from "react";

const AppContentsLazy = lazy(() => import('./AppContent.tsx'));

interface AppProps {
	env: ImportMetaEnv
}

function App({}: AppProps) {
	return (
		<Suspense fallback={
			<div style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100dvw',
				minHeight: '100dvh'
			}}>Loading App...</div>}>
			<AppContentsLazy />
		</Suspense>
	)
}

export default App
