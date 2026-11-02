import { useMemo } from "react";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AuthGuard, AuthProvider, getIsEmbedded, useIsClerkProvided, ClerkProvider } from "@internal/shared";
import { useClerkDarkTheme, useClerkLightTheme } from "@internal/ui-library";
import { UserPreferencesSync } from "@feature/configuration";
import { GuestDemoPreparationGuard, GuestDemoSessionProvider, useGuestDemoPreparation } from "@feature/accounts";
import { DemoPreparationPage } from "@page/demo-preparation-page";

import { ApiProvider, resolveApiMode, useGuestDemoSessionsApi } from "./api";
import { checkEnvVariables } from "./env/check-env.ts";
import { getDemoSession } from "./env/demo-session.ts";
import { GlobalLayout } from "./layouts/GlobalLayout.tsx";

import type { FC, ReactNode } from "react";


function RootComponent() {
	const envVariables = checkEnvVariables();
	const demoSession = useMemo(() => getDemoSession(), []);

	return (
		<DynamicAuthProvider
			key={getIsEmbedded() ? 'embedded' : 'primary'} 
			envVariables={envVariables}
		>
			<GuestDemoSessionScope demoSession={demoSession} envVariables={envVariables}>
				<ApiProvider envVariables={envVariables}>
					<UserPreferencesSync />
					<SignedInOrGuestDemo demoSession={demoSession}>
						<GlobalLayout>
							<Outlet />
						</GlobalLayout>
						<TanStackRouterDevtools initialIsOpen={false} position='bottom-left' />
					</SignedInOrGuestDemo>
				</ApiProvider>
			</GuestDemoSessionScope>
		</DynamicAuthProvider>
	)
}

const GuestDemoSessionScope: FC<{ demoSession?: string; envVariables: ImportMetaEnv; children: ReactNode }> = ({
	demoSession,
	envVariables,
	children
}) => {
	const mode = resolveApiMode(envVariables.CLIENT_API_MODE);
	const client = useGuestDemoSessionsApi({
		baseUrl: envVariables.CLIENT_API_BASE_URL,
		mode,
		sandbox: envVariables.CLIENT_API_SANDBOX,
		demoSession,
	});

	return (
		<GuestDemoSessionProvider
			demoSession={mode === 'live' ? demoSession ?? null : null}
			client={client}
		>
			{children}
		</GuestDemoSessionProvider>
	);
};

const SignedInOrGuestDemo: FC<{ demoSession?: string; children: ReactNode }> = ({
	demoSession,
	children
}) => {
	return demoSession === undefined
		? <AuthGuard>{children}</AuthGuard>
		: <GuestDemoPreparationGate>{children}</GuestDemoPreparationGate>;
};

const GuestDemoPreparationGate: FC<{ children: ReactNode }> = ({ children }) => {
	const preparing = useGuestDemoPreparation();

	return (
		<GuestDemoPreparationGuard preparing={preparing} pending={<DemoPreparationPage />}>
			{children}
		</GuestDemoPreparationGuard>
	);
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