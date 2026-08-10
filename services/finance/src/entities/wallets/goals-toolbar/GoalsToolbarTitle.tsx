import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalsToolbarTitle: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => (
	<span
		className={cn(
			"text-sm font-semibold"
		)}
		{...props}
	>
		{children}
	</span>
);

GoalsToolbarTitle.displayName = 'GoalsToolbarTitle';

export { GoalsToolbarTitle };
