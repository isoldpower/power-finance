import { lazy, Suspense } from "react";
import { BrandAppLoader } from "@widget/core";

import './styles/base.css'
import {SettingsProvider} from "@internal/shared/lib/settings";

const AppContentsLazy = lazy(() => import("./AppContent.tsx"));

function App() {
	return (
		<SettingsProvider>
			<Suspense fallback={<BrandAppLoader />}>
				<AppContentsLazy />
			</Suspense>
		</SettingsProvider>
	);
}

export default App;
