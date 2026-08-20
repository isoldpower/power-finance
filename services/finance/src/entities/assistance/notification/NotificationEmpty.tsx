import { Caption } from "@shared/pure-components/typography";


const NotificationEmpty = () => {
	return (
		<Caption size="13" className="px-2 py-6 text-center">
			No notifications.
		</Caption>
	);
}

NotificationEmpty.displayName = 'NotificationEmpty';

export { NotificationEmpty };
