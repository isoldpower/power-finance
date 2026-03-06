import type { FC } from "react";
import { ClerkLoaded, useAuth } from "@clerk/clerk-react";
import { Navigate } from "@tanstack/react-router";

interface GuestGuardProps {
	children: React.ReactNode;
	to: string;
}

const GuestGuard: FC<GuestGuardProps> = ({ children, to }) => {
	const { isLoaded, isSignedIn } = useAuth();
	
	return (
		<ClerkLoaded>
			{(isLoaded && isSignedIn) ? (
				<Navigate to={to} replace />
			) : (
				<>{children}</>
			)}
		</ClerkLoaded>
	)
}

GuestGuard.displayName = 'GuestGuard';

export { GuestGuard };
export type { GuestGuardProps };