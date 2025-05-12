import type {FC, ReactNode} from "react";
import type { UseClerkThemeOptions } from "../clerk-theme/useClerkTheme.tsx";

import { ClerkProvider } from "@clerk/clerk-react";
import { useNavigate } from "@tanstack/react-router";
import { useClerkTheme } from "../clerk-theme/useClerkTheme.tsx";
import { getFinanceRoute } from "../../config";
import { useRouteWithOrigin } from "../../helpers";


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