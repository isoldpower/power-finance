import { Suspense } from "react";
import { AppLoader } from '@internal/ui-library';
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import '@internal/ui-library/css';
import './styles/_index.css'

import { routeTree } from "./routeTree.gen.ts";


const queryClient = new QueryClient();
const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


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
