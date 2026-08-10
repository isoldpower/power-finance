import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalFormEmojiGrid: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"grid grid-cols-6 gap-1"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalFormEmojiGrid.displayName = 'GoalFormEmojiGrid';

export { GoalFormEmojiGrid };
