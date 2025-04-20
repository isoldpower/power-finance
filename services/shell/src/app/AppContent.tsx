import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "./routeTree.gen.ts";
import {ClerkProvider} from "@clerk/clerk-react";
import {checkEnvVariables} from "@app/env/checkEnv.ts";
import {SidebarProvider} from "@shared/components";

const router = createRouter({ routeTree })

function AppContents() {
	const envVariables = checkEnvVariables()

	return (
		<ClerkProvider publishableKey={envVariables.CLIENT_CLERK_PUBLIC_KEY}>
			<SidebarProvider>
				<RouterProvider router={router} />
			</SidebarProvider>
		</ClerkProvider>
	)
}

export { AppContents };
export default AppContents;
