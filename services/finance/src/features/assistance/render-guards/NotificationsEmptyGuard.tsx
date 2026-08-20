import type { FC, ReactNode } from "react";


interface NotificationsEmptyGuardProps {
	notifications: unknown[];
	children: ReactNode;
	empty: ReactNode;
}

const NotificationsEmptyGuard: FC<NotificationsEmptyGuardProps> = ({ 
	notifications,
	empty,
	children,
}) => {
	return notifications.length === 0 ? empty : children;
}

export { NotificationsEmptyGuard };