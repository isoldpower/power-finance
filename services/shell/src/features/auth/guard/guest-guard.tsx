import { FC } from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "@tanstack/react-router";

interface GuestGuardProps {
	children: React.ReactNode;
	to: string;
}

const GuestGuard: FC<GuestGuardProps> = ({ children, to }) => {
	return (
		<>
			<SignedIn>
				<Navigate to={to} replace />
			</SignedIn>
			<SignedOut>
				{children}
			</SignedOut>
		</>
	)
}

GuestGuard.displayName = 'GuestGuard';

export { GuestGuard };
export type { GuestGuardProps };