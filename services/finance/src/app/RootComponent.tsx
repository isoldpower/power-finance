import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AuthProvider, SettingsProvider } from "@internal/shared";
import { useClerkDarkTheme, useClerkLightTheme } from "@internal/ui-library";

import { checkEnvVariables } from "./env/checkEnv.ts";
import { ApiProvider } from "./api";


function RootComponent() {
	const envVariables = checkEnvVariables()
	const themeDictionary = {
		light: useClerkLightTheme(),
		dark: useClerkDarkTheme(),
	}

	return (
		<SettingsProvider>
			<ApiProvider>
				<AuthProvider
					publicKey={envVariables.CLIENT_CLERK_PUBLIC_KEY}
					clerkThemes={themeDictionary}
				>
					<Outlet/>
					<TanStackRouterDevtools/>
				</AuthProvider>
			</ApiProvider>
		</SettingsProvider>
	)
}

RootComponent.displayName = 'LayoutRoot';

export { RootComponent };
export default RootComponent;