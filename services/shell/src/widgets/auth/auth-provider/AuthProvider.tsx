import type {FC, ReactNode} from "react";

import {useMemo} from "react";
import {getFinanceRoute, useRouteWithOrigin} from "@internal/shared";
import {ClerkProvider} from "@clerk/clerk-react";
import {useNavigate} from "@tanstack/react-router";
import {useClerkTheme} from "@feature/auth";
import {useClerkDarkTheme, useClerkLightTheme} from "@entity/auth";

interface AuthProviderProps {
	children: ReactNode;
	env: ImportMetaEnv;
}

const AuthProvider: FC<AuthProviderProps> = ({ env, children }) => {
	const overviewRoute = getFinanceRoute('overview');
	const navigate = useNavigate();

	const lightTheme = useClerkLightTheme();
	const darkTheme = useClerkDarkTheme();
	const clerkThemes = useMemo(() => ({
		'light': lightTheme,
		'dark': darkTheme,
	}), [darkTheme, lightTheme]);

	const theme = useClerkTheme(clerkThemes);

	return (
		<ClerkProvider
			publishableKey={env.CLIENT_CLERK_PUBLIC_KEY}
			routerPush={(to: string) => navigate({ to })}
			routerReplace={(to: string) => navigate({ to, replace: true })}
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