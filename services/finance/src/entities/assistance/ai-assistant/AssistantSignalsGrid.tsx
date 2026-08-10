import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AssistantSignalsGrid: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"grid grid-cols-2 gap-2"
		)}
		{...props}
	>
		{children}
	</div>
);

AssistantSignalsGrid.displayName = 'AssistantSignalsGrid';

export { AssistantSignalsGrid };
