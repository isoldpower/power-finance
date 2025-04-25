import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import {AuthProvider} from "@internal/shared";
import {useClerkDarkTheme, useClerkLightTheme} from "@internal/ui-library";
import {AppLoader} from "@internal/ui-library";

import { ThemeHandler } from "@feature/settings";
import { AppSidebar, HideOnRoute } from "@shared/components";
import { checkEnvVariables } from "@app/env/checkEnv.ts";

export const Route = createRootRoute({
	pendingComponent: AppLoader,
	component: RootComponent
})

function RootComponent() {
	const envVariables = checkEnvVariables()
	const themeDictionary = {
		light: useClerkLightTheme(),
		dark: useClerkDarkTheme(),
	}

	return (
		<AuthProvider
			publicKey={envVariables.CLIENT_CLERK_PUBLIC_KEY}
			clerkThemes={themeDictionary}
		>
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