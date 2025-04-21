import type {FC, ReactNode} from "react";
import {getFinanceRoute, useRouteWithOrigin} from "@internal/shared";
import {ClerkProvider} from "@clerk/clerk-react";
import {useRouter} from "@tanstack/react-router";
import {useClerkTheme} from "@feature/auth";

interface AuthProviderProps {
	children: ReactNode;
	env: ImportMetaEnv;
}

const AuthProvider: FC<AuthProviderProps> = ({ env, children }) => {
	const overviewRoute = getFinanceRoute('overview');
	const router = useRouter();
	const theme = useClerkTheme();

	return (
		<ClerkProvider
			publishableKey={env.CLIENT_CLERK_PUBLIC_KEY}
			routerPush={(to: string) => router.navigate({ to })}
			routerReplace={(to: string) => router.navigate({ to, replace: true })}
			afterSignOutUrl={useRouteWithOrigin(overviewRoute)}
			appearance={theme}
		>
			{children}
		</ClerkProvider>
	)
}

AuthProvider.displayName = 'AuthProvider';

export { AuthProvider };
export type { AuthProviderProps };