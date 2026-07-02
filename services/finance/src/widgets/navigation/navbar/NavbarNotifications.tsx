import type { FC } from "react";
import {
	FinanceIconButton,
	FinanceMenu,
	FinanceMenuTrigger,
	FinanceMenuContent,
} from "@internal/ui-library";

import { RouteLink } from "@feature/navigation";
import { NotificationBell, NotificationList } from "@entity/assistance";
import type { NotificationListItem } from "@entity/assistance";

interface NavbarNotificationsProps {
	notifications: NotificationListItem[];
	unreadCount: number;
}

const NavbarNotifications: FC<NavbarNotificationsProps> = ({ notifications, unreadCount }) => {
	return (
		<FinanceMenu>
			<FinanceMenuTrigger asChild>
				<FinanceIconButton aria-label="Notifications">
					<NotificationBell unreadCount={unreadCount} />
				</FinanceIconButton>
			</FinanceMenuTrigger>
			<FinanceMenuContent className="w-[340px] p-0">
				<div className="flex items-center justify-between border-b border-border px-4 py-3">
					<span className="text-sm font-semibold">Notifications</span>
					<RouteLink to="settings" className="text-xs font-semibold text-primary">
						Manage
					</RouteLink>
				</div>
				<NotificationList notifications={notifications} />
			</FinanceMenuContent>
		</FinanceMenu>
	);
};

NavbarNotifications.displayName = 'NavbarNotifications';

export { NavbarNotifications };
export type { NavbarNotificationsProps };
