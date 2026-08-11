import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalRowHead: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mb-2.5 flex items-center gap-3"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalRowHead.displayName = 'GoalRowHead';

export { GoalRowHead };
