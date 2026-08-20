import { FinanceIconButton } from "@internal/ui-library";

import type { FC } from "react";


interface NotificationSeenToggleProps {
	seen: boolean;
	disabled?: boolean;
	onAcknowledge: () => void;
}

const NotificationSeenToggle: FC<NotificationSeenToggleProps> = ({ seen, disabled, onAcknowledge }) => {
	const label = seen ? 'Already seen' : 'Mark as seen';

	return (
		<FinanceIconButton
			size="sm"
			variant={seen ? 'active' : 'default'}
			className="size-7"
			aria-label={label}
			aria-pressed={seen}
			title={label}
			disabled={disabled ?? seen}
			onClick={onAcknowledge}
		>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="size-3.5"
			>
				{seen ? (
					<path d="m5 12.5 4.5 4.5L19 7.5" />
				) : (
					<circle cx="12" cy="12" r="8" />
				)}
			</svg>
		</FinanceIconButton>
	);
};

NotificationSeenToggle.displayName = 'NotificationSeenToggle';

export { NotificationSeenToggle };
export type { NotificationSeenToggleProps };
