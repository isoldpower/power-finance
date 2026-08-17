import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AssistantPromptsRowProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const AssistantPromptsRow: FC<AssistantPromptsRowProps> = ({
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
export type { AssistantPromptsRowProps };
