import { cn } from "@internal/ui-library";

import { HIDDEN_SCROLLBAR } from "../scroll-row.ts";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AssistantPromptsRowProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const AssistantPromptsRow: FC<AssistantPromptsRowProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mb-2 flex gap-1.5 overflow-x-auto",
			HIDDEN_SCROLLBAR
		)}
		{...props}
	>
		{children}
	</div>
);

AssistantPromptsRow.displayName = 'AssistantPromptsRow';

export { AssistantPromptsRow };
export type { AssistantPromptsRowProps };
