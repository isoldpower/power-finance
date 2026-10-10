import { Suspense } from "react";
import { AppLoader } from '@internal/ui-library';
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";

import uiLibraryStyles from '@internal/ui-library/css?inline';
import financeStyles from './styles/_index.css?inline';

import { createQueryClient } from "./api/query-client.ts";
import { injectStylesIntoDocumentHead } from "./styles/injectStylesIntoDocumentHead.ts";
import { routeTree } from "./routeTree.gen.ts";


injectStylesIntoDocumentHead('finance-ui-library-styles', uiLibraryStyles);
injectStylesIntoDocumentHead('finance-styles', financeStyles);

const queryClient = createQueryClient();
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
