import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { BrandAppLoader } from "@widget/core";
import {AppSidebar} from "@shared/components";
import {ThemeHandler} from "@feature/settings";

export const Route = createRootRoute({
	pendingComponent: BrandAppLoader,
	component: () => {
		return (
			<ThemeHandler>
				<AppSidebar />
				<div className='relative'>
					<Outlet/>
				</div>
				<TanStackRouterDevtools position="bottom-right"/>
			</ThemeHandler>
		)
	},
})