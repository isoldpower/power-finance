import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AssistantSignalsRowProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const AssistantSignalsRow: FC<AssistantSignalsRowProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex gap-2 overflow-x-auto",
			'[scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
		)}
		{...props}
	>
		{children}
	</div>
);

AssistantSignalsRow.displayName = 'AssistantSignalsRow';

export { AssistantSignalsRow };
export type { AssistantSignalsRowProps };
