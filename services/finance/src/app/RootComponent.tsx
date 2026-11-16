import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import {
	AuthProvider,
	ClerkProvider,
	DemoSessionProvider,
	getIsEmbedded,
	GuestDemoSessionProvider,
	SignedInOrGuestDemo,
	useIsClerkProvided,
} from "@internal/shared";
import { FinanceButton, useClerkDarkTheme, useClerkLightTheme } from "@internal/ui-library";
import { UserPreferencesSync } from "@feature/configuration";
import { DemoPreparationPage } from "@page/demo-preparation-page";

import { ApiProvider, resolveApiMode } from "./api";
import { checkEnvVariables } from "./env/check-env.ts";
import { GlobalLayout } from "./layouts/GlobalLayout.tsx";

import type { FC, ReactNode } from "react";


const renderDemoRetry = (retry: () => void): ReactNode => (
	<FinanceButton type="button" variant="danger" onClick={retry}>
		Try again
	</FinanceButton>
);

function RootComponent() {
	const envVariables = checkEnvVariables();

	return (
		<DynamicAuthProvider
			key={getIsEmbedded() ? 'embedded' : 'primary'} 
			envVariables={envVariables}
		>
			<DemoSessionProvider
				baseUrl={envVariables.CLIENT_API_BASE_URL}
				mode={resolveApiMode(envVariables.CLIENT_API_MODE)}
				sandbox={envVariables.CLIENT_API_SANDBOX}
				renderRetry={renderDemoRetry}
			>
				<GuestDemoSessionProvider
					baseUrl={envVariables.CLIENT_API_BASE_URL}
					mode={resolveApiMode(envVariables.CLIENT_API_MODE)}
					sandbox={envVariables.CLIENT_API_SANDBOX}
				>
					<ApiProvider envVariables={envVariables}>
						<UserPreferencesSync />
						<SignedInOrGuestDemo pending={<DemoPreparationPage />} renderRetry={renderDemoRetry}>
							<GlobalLayout>
								<Outlet />
							</GlobalLayout>
							<TanStackRouterDevtools initialIsOpen={false} position='bottom-left' />
						</SignedInOrGuestDemo>
					</ApiProvider>
				</GuestDemoSessionProvider>
			</DemoSessionProvider>
		</DynamicAuthProvider>
	)
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