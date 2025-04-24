import { createRouter, RouterProvider } from "@tanstack/react-router";
import { SettingsProvider } from "@internal/shared";

import { routeTree } from "./routeTree.gen.ts";

const router = createRouter({ routeTree })

function AppContents() {
	return (
		<SettingsProvider>
			<RouterProvider router={router} />
		</SettingsProvider>
	)
}

export { AppContents };
export default AppContents;
