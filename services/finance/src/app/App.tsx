import { Suspense } from "react";
import { AppLoader } from '@internal/ui-library';
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import './styles/_index.css'
import '@internal/ui-library/css';

import { routeTree } from "./routeTree.gen.ts";


const queryClient = new QueryClient();
const router = createRouter({ routeTree });

function App() {
	return (
		<Suspense fallback={<AppLoader />}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</Suspense>
	)
}

export default App
