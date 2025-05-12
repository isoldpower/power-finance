import { Suspense } from "react";

import './styles/_index.css';
import '@internal/ui-library/css';

import { SettingsProvider } from "@internal/shared";
import { AppLoader } from "@internal/ui-library";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";


const router = createRouter({ routeTree });

function App() {
	return (
		<SettingsProvider>
			<Suspense fallback={<AppLoader />}>
				<RouterProvider router={router} />
			</Suspense>
		</SettingsProvider>
	);
}

export default App;