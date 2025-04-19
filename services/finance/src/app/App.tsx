import './styles/index.css'
import './App.css'

import {SettingsProvider} from "@internal/shared";
import {lazy, Suspense} from "react";

const AppContentsLazy = lazy(() => import('./AppContent.tsx'));

function App() {
	return (
		<SettingsProvider>
			<Suspense fallback={<div>Loading...</div>}>
				<AppContentsLazy />
			</Suspense>
		</SettingsProvider>
	)
}

export default App
