import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AutomationsToolbarContainer: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex items-center gap-2.5 border-b border-border px-[18px] py-3.5"
		)}
		{...props}
	>
		{children}
	</div>
);

AutomationsToolbarContainer.displayName = 'AutomationsToolbarContainer';

export { AutomationsToolbarContainer };
