import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AssistantOverlayRoot: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"finance-theme"
		)}
		{...props}
	>
		{children}
	</div>
);

AssistantOverlayRoot.displayName = 'AssistantOverlayRoot';

export { AssistantOverlayRoot };
