import { lazy, Suspense } from "react";
import { AppLoader } from "@widget/settings";

import './styles/_index.css';
import '@internal/ui-library/dist/ui-library.css';

import { SettingsProvider } from "@internal/shared";

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