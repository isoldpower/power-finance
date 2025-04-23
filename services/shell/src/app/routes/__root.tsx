import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { BrandAppLoader } from "@widget/settings";
import { ThemeHandler } from "@feature/settings";
import { AppSidebar, HideOnRoute } from "@shared/components";
import { checkEnvVariables } from "@app/env/checkEnv.ts";
import { AuthProvider } from "@widget/auth";

export const Route = createRootRoute({
	pendingComponent: BrandAppLoader,
	component: RootComponent
})

function RootComponent() {
	const envVariables = checkEnvVariables()

	return (
		<AuthProvider env={envVariables}>
			<ThemeHandler>
				<HideOnRoute routes={['/auth']}>
					<AppSidebar />
				</HideOnRoute>
				<div className='relative'>
					<Outlet/>
				</div>
				<TanStackRouterDevtools position="bottom-right"/>
			</ThemeHandler>
		</AuthProvider>
	)
}