import { useCallback } from "react";
import { FinanceNotification } from "@internal/ui-library";
import { NotificationSeenToggle } from "@entity/assistance";
import { useAckNotification } from "@feature/assistance";

import type { FC } from "react";
import type { Notification } from "@feature/assistance";


interface NavbarNotificationItemProps {
	notification: Notification;
}

const NavbarNotificationItem: FC<NavbarNotificationItemProps> = ({ notification }) => {
	const { mutate: ackNotification, isPending } = useAckNotification(notification.id);
	
	const handleToggleSeen = useCallback(() => {
		ackNotification({ ack: !notification.ack });
	}, [ackNotification, notification.ack]);

	return (
		<FinanceNotification
			level={notification.level}
			title={notification.title}
			subtitle={notification.body}
			time={notification.time}
			className={notification.ack ? 'opacity-60' : undefined}
			action={
				<NotificationSeenToggle
					seen={notification.ack}
					disabled={isPending}
					onToggle={handleToggleSeen}
				/>
			}
		/>
	);
};

NavbarNotificationItem.displayName = 'NavbarNotificationItem';

export { NavbarNotificationItem };
export type { NavbarNotificationItemProps };
