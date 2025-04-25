import { lazy, Suspense } from "react";

import './styles/_index.css';
import '@internal/ui-library/css';

import { SettingsProvider } from "@internal/shared";
import { AppLoader } from "@internal/ui-library";

const AppContentsLazy = lazy(() => import("./AppContent.tsx"));

function App() {
	return (
		<SettingsProvider>
			<Suspense fallback={<AppLoader />}>
				<AppContentsLazy />
			</Suspense>
		</SettingsProvider>
	);
}

export default App;