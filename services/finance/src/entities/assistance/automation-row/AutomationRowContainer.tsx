import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AutomationRowContainer: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"fx-slidein flex items-center gap-3 border-b border-border px-[18px] py-3.5",
			"last:border-b-0 hover:bg-secondary"
		)}
		{...props}
	>
		{children}
	</div>
);

AutomationRowContainer.displayName = 'AutomationRowContainer';

export { AutomationRowContainer };
