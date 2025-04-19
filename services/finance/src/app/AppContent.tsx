import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "./routeTree.gen.ts";

const router = createRouter({ routeTree })

function AppContents() {
	return (
		<RouterProvider router={router} />
	)
}

export { AppContents };
export default AppContents;
