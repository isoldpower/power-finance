import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AutomationsToolbarTitle: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
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

AutomationsToolbarTitle.displayName = 'AutomationsToolbarTitle';

export { AutomationsToolbarTitle };
