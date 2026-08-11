import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AutomationRowBody: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"min-w-0 flex-1"
		)}
		{...props}
	>
		{children}
	</div>
);

AutomationRowBody.displayName = 'AutomationRowBody';

export { AutomationRowBody };
