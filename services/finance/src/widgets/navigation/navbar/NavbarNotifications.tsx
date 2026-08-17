import {
	FinanceIconButton,
	FinanceMenu,
	FinanceMenuTrigger,
	FinanceMenuContent,
} from "@internal/ui-library";

import { RouteLink } from "@shared/routing";
import {
	useNotifications,
	useNotificationsCount,
	useNotificationsStream,
	NotificationsEmptyGuard,
} from "@feature/assistance";
import { NotificationBell, NotificationEmpty, NotificationList } from "@entity/assistance";
import { CardTitle, textClass } from "@shared/pure-components/typography";
import { NOTIFICATIONS_PAGE_SIZE } from "./config.ts";

import type { ReactNode, FC } from "react";
import type { Notification } from "@entity/assistance";


interface NavbarNotificationsProps {
	children: ((notification: Notification, order: number) => ReactNode) | ReactNode;
}

const NavbarNotifications: FC<NavbarNotificationsProps> = ({ children }) => {
	const { notifications } = useNotifications(undefined, { limit: NOTIFICATIONS_PAGE_SIZE });
	const { unacknowledged } = useNotificationsCount();

	useNotificationsStream();

	return (
		<FinanceMenu>
			<FinanceMenuTrigger asChild>
				<FinanceIconButton aria-label="Notifications">
					<NotificationBell unreadCount={unacknowledged} />
				</FinanceIconButton>
			</FinanceMenuTrigger>
			<FinanceMenuContent className="w-[340px] p-0">
				<div className="flex items-center justify-between border-b border-border px-4 py-3">
					<CardTitle>
						Notifications
					</CardTitle>
					<RouteLink to="settings" className={textClass({ size: 'xs', weight: 'semibold', tone: 'accent' })}>
						Manage
					</RouteLink>
				</div>
				<NotificationList>
					<NotificationsEmptyGuard notifications={notifications} empty={<NotificationEmpty />}>
						{notifications.map((notification, index) => typeof children === 'function'
							? children(notification, index)
							: children
						)}
					</NotificationsEmptyGuard>
				</NotificationList>
			</FinanceMenuContent>
		</FinanceMenu>
	);
};

NavbarNotifications.displayName = 'NavbarNotifications';

export { NavbarNotifications };
