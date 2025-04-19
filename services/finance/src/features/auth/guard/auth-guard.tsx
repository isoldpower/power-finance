import {FC} from "react";
import {RedirectToSignIn, SignedIn, SignedOut} from "@clerk/clerk-react";
import {useLocation} from "@tanstack/react-router";

interface AuthGuardProps {
	children: React.ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
	const { pathname } = useLocation();

	return (
		<>
			<SignedOut>
				<RedirectToSignIn signInFallbackRedirectUrl={pathname} />
			</SignedOut>
			<SignedIn>
				{children}
			</SignedIn>
		</>
	)
}

AuthGuard.displayName = 'AuthGuard';

export { AuthGuard };
export type { AuthGuardProps };