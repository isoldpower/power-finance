import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AssistantSignalsSection: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"border-b border-border bg-secondary px-3.5 py-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

AssistantSignalsSection.displayName = 'AssistantSignalsSection';

export { AssistantSignalsSection };
