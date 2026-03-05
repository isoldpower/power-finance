import {FC, ReactNode, useEffect} from "react";
import type { UseClerkThemeOptions } from "../hooks/useClerkTheme.tsx";

import { useNavigate } from "@tanstack/react-router";
import { useClerkTheme } from "../hooks/useClerkTheme.tsx";
import { getFinanceRoute } from "../../config";
import { useRouteWithOrigin } from "../../helpers";
import { ClerkProvider } from './ClerkProvider.tsx';

interface AuthProviderProps {
	children: ReactNode;
	publicKey: string;
	clerkThemes: UseClerkThemeOptions;
}

const AuthProvider: FC<AuthProviderProps> = ({
	publicKey,
	clerkThemes,
	children
}) => {
	const overviewRoute = getFinanceRoute('dashboard');
	const navigate = useNavigate();

	const theme = useClerkTheme(clerkThemes);
	useEffect(() => {
		console.log(theme);
	}, [theme]);

	return (
		<ClerkProvider
			publishableKey={publicKey}
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