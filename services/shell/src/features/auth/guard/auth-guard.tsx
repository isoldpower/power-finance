import type { FC } from "react";
import { ClerkLoaded, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useLocation } from "@tanstack/react-router";

interface AuthGuardProps {
	children: React.ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
	const { pathname } = useLocation();

	return (
		<ClerkLoaded>
			<SignedOut>
				<RedirectToSignIn signInFallbackRedirectUrl={pathname}/>
			</SignedOut>
			<SignedIn>
				{children}
			</SignedIn>
		</ClerkLoaded>
	)
}

AuthGuard.displayName = 'AuthGuard';

export { AuthGuard };
export type { AuthGuardProps };