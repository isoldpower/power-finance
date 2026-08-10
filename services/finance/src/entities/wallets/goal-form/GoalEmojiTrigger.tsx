import { cn } from "@internal/ui-library";

import type { ButtonHTMLAttributes, FC } from "react";


const GoalEmojiTrigger: FC<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>> = ({
	children,
	...props
}) => (
	<button
		type="button"
		className={cn(
			"flex size-10 flex-none items-center justify-center rounded-[var(--radius-md)]",
			"border border-border-strong bg-card text-[18px] hover:bg-secondary"
		)}
		{...props}
	>
		{children}
	</button>
);

GoalEmojiTrigger.displayName = 'GoalEmojiTrigger';

export { GoalEmojiTrigger };
