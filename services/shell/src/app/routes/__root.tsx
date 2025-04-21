import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { BrandAppLoader } from "@widget/settings";
import {ThemeHandler} from "@feature/settings";
import {AppSidebar, HideOnRoute} from "@shared/components";

export const Route = createRootRoute({
	pendingComponent: BrandAppLoader,
	component: () => {
		return (
			<ThemeHandler>
				<HideOnRoute routes={['/auth']}>
					<AppSidebar />
				</HideOnRoute>
				<div className='relative'>
					<Outlet/>
				</div>
				<TanStackRouterDevtools position="bottom-right"/>
			</ThemeHandler>
		)
	},
})