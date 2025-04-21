import type { FC } from "react";
import { ClerkLoaded, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "@tanstack/react-router";

interface GuestGuardProps {
	children: React.ReactNode;
	to: string;
}

const GuestGuard: FC<GuestGuardProps> = ({ children, to }) => {
	return (
		<ClerkLoaded>
			<SignedIn>
				<Navigate to={to} replace />
			</SignedIn>
			<SignedOut>
				{children}
			</SignedOut>
		</ClerkLoaded>
	)
}

GuestGuard.displayName = 'GuestGuard';

export { GuestGuard };
export type { GuestGuardProps };