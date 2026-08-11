import { cn } from "@internal/ui-library";

import type { ButtonHTMLAttributes, FC } from "react";


const GoalIconTrigger: FC<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>> = ({
	children,
	...props
}) => (
	<button
		type="button"
		className={cn(
			"flex size-10 flex-none items-center justify-center rounded-[var(--radius-md)]",
			"border border-border-strong bg-card text-text-2 hover:bg-secondary"
		)}
		{...props}
	>
		{children}
	</button>
);

GoalIconTrigger.displayName = 'GoalIconTrigger';

export { GoalIconTrigger };
