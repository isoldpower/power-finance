import { createRootRoute, Outlet } from '@tanstack/react-router';
import { AppLoader, UiSidebarInset } from "@internal/ui-library";

import { AppSidebar, SidebarFloatingTrigger } from '@widget/navigation';
import { SidebarThemeSwitch } from '@widget/settings';
import { SidebarAuthentication } from '@widget/auth';
import { HideOnRoute } from '@shared/components';

import { RootComponent } from '../RootComponent.tsx';
import { useRouteDocumentTitle } from '../document-title';


export const Route = createRootRoute({
	pendingComponent: AppLoader,
	component: RootLayout
});

function RootLayout() {
	useRouteDocumentTitle();

	return (
		<RootComponent>
			<HideOnRoute routes={['/auth']}>
				<AppSidebar>
					<SidebarThemeSwitch />
					<SidebarAuthentication />
				</AppSidebar>
				<SidebarFloatingTrigger />
			</HideOnRoute>
			<UiSidebarInset>
				<Outlet />
			</UiSidebarInset>
		</RootComponent>
	)
}