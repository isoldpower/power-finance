import type { ComponentProps, FC } from "react";
import { FinanceNotification } from "@internal/ui-library";

type NotificationLevel = ComponentProps<typeof FinanceNotification>["level"];

interface NotificationListItem {
	id: string;
	level: NotificationLevel;
	title: string;
	body: string;
	time: string;
}

interface NotificationListProps {
	notifications: NotificationListItem[];
}

const NotificationList: FC<NotificationListProps> = ({ notifications }) => (
	<div className="flex max-h-[340px] flex-col gap-2 overflow-y-auto p-2">
		{notifications.length === 0 ? (
			<div className="px-2 py-6 text-center text-[13px] text-text-3">No notifications.</div>
		) : (
			notifications.map((notification) => (
				<FinanceNotification
					key={notification.id}
					level={notification.level}
					title={notification.title}
					subtitle={notification.body}
					time={notification.time}
				/>
			))
		)}
	</div>
);

NotificationList.displayName = 'NotificationList';

export { NotificationList };
export type { NotificationListItem };
