import type { FC } from "react";
import {
	FinanceIconButton,
	FinanceMenu,
	FinanceMenuTrigger,
	FinanceMenuContent, 
	FinanceNotification,
} from "@internal/ui-library";

import { RouteLink } from "@shared/routing";
import { useNotifications, useNotificationsCount, NotificationsEmptyGuard } from "@feature/assistance";
import { NotificationBell, NotificationEmpty, NotificationList } from "@entity/assistance";
import { CardTitle, textClass } from "@shared/pure-components/typography";


const NavbarNotifications: FC = () => {
	const { notifications } = useNotifications({ limit: 8 });
	const { count: unreadCount } = useNotificationsCount(false);
	
	return (
		<FinanceMenu>
			<FinanceMenuTrigger asChild>
				<FinanceIconButton aria-label="Notifications">
					<NotificationBell unreadCount={unreadCount} />
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
						{notifications.map((notification) => (
							<FinanceNotification
								key={notification.id}
								level={notification.level}
								title={notification.title}
								subtitle={notification.body}
								time={notification.time}
							/>
						))}
					</NotificationsEmptyGuard>
				</NotificationList>
			</FinanceMenuContent>
		</FinanceMenu>
	);
};

NavbarNotifications.displayName = 'NavbarNotifications';

export { NavbarNotifications };
