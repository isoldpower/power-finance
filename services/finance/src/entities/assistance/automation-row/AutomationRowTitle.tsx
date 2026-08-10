import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AutomationRowTitle: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex items-center gap-2 text-[13.5px] font-semibold"
		)}
		{...props}
	>
		{children}
	</div>
);

AutomationRowTitle.displayName = 'AutomationRowTitle';

export { AutomationRowTitle };
