import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import {LayoutContainer} from "@entity/core";

export const Route = createRootRoute({
	component: () => (
		<>
			<LayoutContainer title='Root Container'>
				<Outlet />
			</LayoutContainer>
			<TanStackRouterDevtools />
		</>
	),
})