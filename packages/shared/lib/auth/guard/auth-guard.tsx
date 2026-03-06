import type { FC } from "react";
import { ClerkLoaded, RedirectToSignIn, useAuth } from "@clerk/clerk-react";
import { useLocation } from "@tanstack/react-router";

interface AuthGuardProps {
	children: React.ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
	const { isLoaded, isSignedIn } = useAuth();
	const { pathname } = useLocation();

	return (
		<ClerkLoaded>
			{(!isLoaded || !isSignedIn) ? (
				<RedirectToSignIn signInFallbackRedirectUrl={pathname}/>
			) : (
				<>{children}</>
			)}
		</ClerkLoaded>
	)
}

AuthGuard.displayName = 'AuthGuard';

export { AuthGuard };
export type { AuthGuardProps };