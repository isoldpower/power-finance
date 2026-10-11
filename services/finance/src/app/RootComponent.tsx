import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AuthGuard, AuthProvider, getIsEmbedded, useIsClerkProvided, ClerkProvider } from "@internal/shared";
import { useClerkDarkTheme, useClerkLightTheme } from "@internal/ui-library";
import { UserPreferencesSync } from "@feature/configuration";

import { ApiProvider } from "./api";
import { checkEnvVariables } from "./env/check-env.ts";
import { getDemoSession } from "./env/demo-session.ts";
import { GlobalLayout } from "./layouts/GlobalLayout.tsx";

import {FC, ReactNode, useMemo} from "react";


function RootComponent() {
	const envVariables = checkEnvVariables();
	const isGuestDemo = useMemo(() => getDemoSession() !== undefined, []);

	return (
		<DynamicAuthProvider
			key={getIsEmbedded() ? 'embedded' : 'primary'} 
			envVariables={envVariables}
		>
			<ApiProvider envVariables={envVariables}>
				<UserPreferencesSync />
				<SignedInOrGuestDemo isGuestDemo={isGuestDemo}>
					<GlobalLayout>
						<Outlet />
		 			</GlobalLayout>
					<TanStackRouterDevtools initialIsOpen={false} position='bottom-left' />
				</SignedInOrGuestDemo>
			</ApiProvider>
		</DynamicAuthProvider>
	)
}

const SignedInOrGuestDemo: FC<{ isGuestDemo: boolean; children: ReactNode }> = ({
	isGuestDemo,
	children
}) => {
	return isGuestDemo
		? children
		: <AuthGuard>{children}</AuthGuard>;
};

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
	};

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