import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AssistantPromptsRow: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mb-2.5 flex flex-wrap gap-1.5"
		)}
		{...props}
	>
		{children}
	</div>
);

AssistantPromptsRow.displayName = 'AssistantPromptsRow';

export { AssistantPromptsRow };
