import type { FC, ReactNode } from "react";


interface GuestDemoPreparationGuardProps {
	preparing: boolean;
	children: ReactNode;
	pending: ReactNode;
}

const GuestDemoPreparationGuard: FC<GuestDemoPreparationGuardProps> = ({
	preparing,
	pending,
	children,
}) => {
	return preparing ? pending : children;
};

GuestDemoPreparationGuard.displayName = 'GuestDemoPreparationGuard';

export { GuestDemoPreparationGuard };
export type { GuestDemoPreparationGuardProps };
