import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalRowContainer: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"fx-slidein border-b border-border px-[18px] py-3.5 last:border-b-0"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalRowContainer.displayName = 'GoalRowContainer';

export { GoalRowContainer };
