import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "./routeTree.gen.ts";
import {checkEnvVariables} from "@app/env/checkEnv.ts";
import {SidebarProvider} from "@shared/components";
import {AuthProvider} from "@feature/auth";

const router = createRouter({ routeTree })

function AppContents() {
	const envVariables = checkEnvVariables()

	return (
		<AuthProvider env={envVariables}>
			<SidebarProvider>
				<RouterProvider router={router} />
			</SidebarProvider>
		</AuthProvider>
	)
}

export { AppContents };
export default AppContents;
