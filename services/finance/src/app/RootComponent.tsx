import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AuthProvider, ClerkProvider, getIsEmbedded } from "@internal/shared";
import { useClerkDarkTheme, useClerkLightTheme } from "@internal/ui-library";

import { checkEnvVariables } from "./env/checkEnv.ts";
import { ApiProvider } from "./api";
import { FC, ReactNode, useMemo } from "react";


function RootComponent() {
	const envVariables = checkEnvVariables();
	const ActualAuthProvider = useMemo(() => {
		return getIsEmbedded() ? EmbeddedAuthProvider : PrimaryAuthProvider;
	}, []);

	return (
		<ApiProvider>
			<ActualAuthProvider envVariables={envVariables}>
				<Outlet />
				<TanStackRouterDevtools initialIsOpen={false} position='bottom-left' />
			</ActualAuthProvider>
		</ApiProvider>
	)
}

const EmbeddedAuthProvider: FC<{ envVariables: ImportMetaEnv; children: ReactNode; }> = ({
	envVariables,
	children
}) => {
	return (
		<ClerkProvider 
			publishableKey={envVariables.CLIENT_CLERK_PUBLIC_KEY}
		>
			{children}
		</ClerkProvider>
	);
}

const PrimaryAuthProvider: FC<{ envVariables: ImportMetaEnv; children: ReactNode; }> = ({
	envVariables,
	children
}) => {
	const themeDictionary = {
		light: useClerkLightTheme(),
		dark: useClerkDarkTheme(),
	}

	return (
		<AuthProvider
			publicKey={envVariables.CLIENT_CLERK_PUBLIC_KEY}
			clerkThemes={themeDictionary}
		>
			{children}
		</AuthProvider>
	)
}

RootComponent.displayName = 'RootComponent';

export { RootComponent };
export default RootComponent;