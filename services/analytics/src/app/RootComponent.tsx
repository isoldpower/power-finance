import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Outlet } from "@tanstack/react-router";
import { useClerkDarkTheme, useClerkLightTheme } from "@internal/ui-library";
import { AuthGuard, AuthProvider, ClerkProvider, getIsEmbedded, useIsClerkProvided } from "@internal/shared";

import type { FC, ReactNode } from "react";
import { checkEnvVariables } from "@app/env/checkEnv.ts";
import { ApiProvider } from "@app/api/context.tsx";


const RootComponent: FC = () => {
	const envVariables = checkEnvVariables();
	
	return (
		<DynamicAuthProvider
			key={getIsEmbedded() ? 'embedded' : 'primary'}
			envVariables={envVariables}
		>
			<ApiProvider envVariables={envVariables}>
				<AuthGuard>
					<Outlet />
					<TanStackRouterDevtools initialIsOpen={false} position='bottom-left' />
				</AuthGuard>
			</ApiProvider>
		</DynamicAuthProvider>
	);
}

const DynamicAuthProvider: FC<{ envVariables: ImportMetaEnv; children: ReactNode }> = ({
	envVariables,
	children
}) => {
	const isEmbedded = getIsEmbedded();

	if (isEmbedded) {
		return (
			<EmbeddedAuthProvider envVariables={envVariables}>
				{children}
			</EmbeddedAuthProvider>
		);
	}

	return (
		<PrimaryAuthProvider envVariables={envVariables}>
			{children}
		</PrimaryAuthProvider>
	);
};

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
	);
}

export { RootComponent };
