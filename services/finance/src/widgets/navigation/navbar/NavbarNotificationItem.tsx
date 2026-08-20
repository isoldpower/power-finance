import { useCallback } from "react";
import { FinanceNotification } from "@internal/ui-library";
import { NotificationSeenToggle } from "@entity/assistance";
import { useAckNotification } from "@feature/assistance";
import { relativeAgo } from "@shared/formatting";
import { NOTIFICATION_LEVEL } from "./config.ts";

import type { FC } from "react";
import type { Notification } from "@entity/assistance";


interface NavbarNotificationItemProps {
	notification: Notification;
}

const NavbarNotificationItem: FC<NavbarNotificationItemProps> = ({ notification }) => {
	const { mutate: ackNotification, isPending } = useAckNotification();
	const seen = notification.acknowledgedAt !== null;

	const handleAcknowledge = useCallback(() => {
		ackNotification(notification.id);
	}, [ackNotification, notification.id]);

	return (
		<FinanceNotification
			level={NOTIFICATION_LEVEL[notification.severity]}
			title={notification.title}
			subtitle={notification.body}
			time={relativeAgo(notification.createdAt)}
			className={seen ? 'opacity-60' : undefined}
			action={
				<NotificationSeenToggle
					seen={seen}
					disabled={isPending}
					onAcknowledge={handleAcknowledge}
				/>
			}
		/>
	);
};

NavbarNotificationItem.displayName = 'NavbarNotificationItem';

export { NavbarNotificationItem };
export type { NavbarNotificationItemProps };
