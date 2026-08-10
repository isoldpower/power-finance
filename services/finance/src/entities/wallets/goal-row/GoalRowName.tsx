import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalRowName: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"text-[13.5px] font-semibold"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalRowName.displayName = 'GoalRowName';

export { GoalRowName };
