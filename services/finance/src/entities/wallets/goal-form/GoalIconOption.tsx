import { cn } from "@internal/ui-library";

import type { ButtonHTMLAttributes, FC } from "react";


interface GoalIconOptionProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'> {
	selected: boolean;
}

const GoalIconOption: FC<GoalIconOptionProps> = ({
	children,
	selected,
	...props
}) => (
	<button
		type="button"
		className={cn(
			"flex size-8 items-center justify-center rounded-[var(--radius-sm)] text-text-2 hover:bg-secondary",
			selected && "bg-secondary ring-1 ring-primary"
		)}
		{...props}
	>
		{children}
	</button>
);

GoalIconOption.displayName = 'GoalIconOption';

export { GoalIconOption };
export type { GoalIconOptionProps };
