import {FC, ReactNode} from "react";
import {getFinanceRoute, getShellRoute, useRouteWithOrigin} from "@internal/shared";
import {ClerkProvider} from "@clerk/clerk-react";
import {useRouter} from "@tanstack/react-router";

interface AuthProviderProps {
	children: ReactNode;
	publicKey: string
}

const AuthProvider: FC<AuthProviderProps> = ({ publicKey, children }) => {
	const routes = getShellRoute('auth');
	const overviewRoute = getFinanceRoute('overview');
	const router = useRouter();

	return (
		<ClerkProvider
			routerPush={(to: string) => router.navigate({ to })}
			routerReplace={(to: string) => router.navigate({ to, replace: true })}
			publishableKey={publicKey}
			afterSignOutUrl={useRouteWithOrigin(overviewRoute)}
			signUpUrl={routes.signup}
			signInUrl={routes.login}
		>
			{children}
		</ClerkProvider>
	)
}

AuthProvider.displayName = 'AuthProvider';

export { AuthProvider };
export type { AuthProviderProps };