import {lazy, Suspense} from "react";
import {BrandAppLoader} from "@widget/core";

import './styles/base.css'

const AppContentsLazy = lazy(() => import("./AppContent.tsx"));

function App() {
	return (
		<Suspense fallback={<BrandAppLoader />}>
			<AppContentsLazy />
		</Suspense>
	);
}

export default App;
