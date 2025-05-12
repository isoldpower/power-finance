import { createRootRoute, Outlet } from '@tanstack/react-router';
import { AppLoader, SidebarInset } from "@internal/ui-library";

import { RootComponent } from '../RootComponent.tsx';
import { AppSidebar, HideOnRoute, SidebarFloatingTrigger } from '@shared/components';


export const Route = createRootRoute({
	pendingComponent: AppLoader,
	component: RootLayout
});

function RootLayout() {
	return (
		<RootComponent>
			<HideOnRoute routes={['/auth']}>
				<AppSidebar />
				<SidebarFloatingTrigger />
			</HideOnRoute>
			<SidebarInset>
				<Outlet />
			</SidebarInset>
		</RootComponent>
	)
}