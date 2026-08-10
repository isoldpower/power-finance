import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalRowMeta: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"text-[11px] text-text-3"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalRowMeta.displayName = 'GoalRowMeta';

export { GoalRowMeta };
