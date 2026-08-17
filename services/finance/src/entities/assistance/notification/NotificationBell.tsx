import { cn } from "@internal/ui-library";
import { Text } from "@shared/pure-components/typography";

import type { FC } from "react";


interface NotificationBellProps {
	unreadCount: number;
}

const NotificationBell: FC<NotificationBellProps> = ({ unreadCount }) => (
	<>
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
			<path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
		</svg>
		{unreadCount > 0 ? (
			<Text
				size="10"
				weight="semibold"
				tone="inverted"
				className={cn(
					"absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center",
					"rounded-full border-[1.5px] border-[var(--surface)] bg-neg px-1"
				)}
			>
				{unreadCount}
			</Text>
		) : null}
	</>
);

NotificationBell.displayName = 'NotificationBell';

export { NotificationBell };
export type { NotificationBellProps };
