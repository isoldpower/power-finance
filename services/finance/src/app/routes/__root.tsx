import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AuthProvider, SettingsProvider } from "@internal/shared";
import { useClerkDarkTheme, useClerkLightTheme } from "@internal/ui-library";

import { getTanStackPageFx } from "@shared/components";
import { checkEnvVariables } from "../env/checkEnv.ts";

export const Route = createRootRoute({
	component: RootComponent,
	...getTanStackPageFx('default-page')
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
			<SettingsProvider>
				<Outlet/>
				<TanStackRouterDevtools/>
			</SettingsProvider>
		</AuthProvider>
	)
}