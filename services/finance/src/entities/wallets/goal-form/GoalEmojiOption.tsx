import { cn } from "@internal/ui-library";

import type { ButtonHTMLAttributes, FC } from "react";


interface GoalEmojiOptionProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'> {
	selected: boolean;
}

const GoalEmojiOption: FC<GoalEmojiOptionProps> = ({
	children,
	selected,
	...props
}) => (
	<button
		type="button"
		className={cn(
			"flex size-8 items-center justify-center rounded-[var(--radius-sm)] text-[18px] hover:bg-secondary",
			selected && "bg-secondary ring-1 ring-primary"
		)}
		{...props}
	>
		{children}
	</button>
);

GoalEmojiOption.displayName = 'GoalEmojiOption';

export { GoalEmojiOption };
export type { GoalEmojiOptionProps };
