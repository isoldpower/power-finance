import { createRootRoute } from '@tanstack/react-router';
import { RootComponent } from '../RootComponent.tsx';
import { AuthProvider, ClerkProvider, getIsEmbedded, SettingsProvider, useIsClerkProvided } from "@internal/shared";
import { useClerkDarkTheme, useClerkLightTheme } from "@internal/ui-library";
import { useMemo } from "react";
import { checkEnvVariables } from "../env/checkEnv.ts";

import type { FC, ReactNode } from "react";


export const Route = createRootRoute({
  	component: RootLayout,
})

function RootLayout() {
	const envVariables = checkEnvVariables();
	const ActualAuthProvider = useMemo(() => {
		return getIsEmbedded() ? EmbeddedAuthProvider : PrimaryAuthProvider;
	}, []);
	
	return (
		<SettingsProvider>
			<ActualAuthProvider envVariables={envVariables}>
				<RootComponent />
			</ActualAuthProvider>
		</SettingsProvider>
	);
}

const EmbeddedAuthProvider: FC<{ envVariables: ImportMetaEnv; children: ReactNode; }> = ({
	children,
	envVariables
}) => {
	const clerkProvided = useIsClerkProvided();

	return clerkProvided
		? children
		: (
			<ClerkProvider publishableKey={envVariables.CLIENT_CLERK_PUBLIC_KEY}>
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