import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "./routeTree.gen.ts";
import {checkEnvVariables} from "@app/env/checkEnv.ts";
import {SidebarProvider} from "@shared/components";

const router = createRouter({ routeTree })

function AppContents() {
	console.debug(checkEnvVariables())

	return (
		<SidebarProvider>
			<RouterProvider router={router} />
		</SidebarProvider>
	)
}

export { AppContents };
export default AppContents;
