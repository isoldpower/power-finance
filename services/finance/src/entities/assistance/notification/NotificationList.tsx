import type { FC, ReactNode } from "react";


interface NotificationListProps {
	children: ReactNode;
}

const NotificationList: FC<NotificationListProps> = ({ children }) => (
	<div className="flex max-h-[340px] flex-col gap-2 overflow-y-auto p-2">
		{children}
	</div>
);

NotificationList.displayName = 'NotificationList';

export { NotificationList };
