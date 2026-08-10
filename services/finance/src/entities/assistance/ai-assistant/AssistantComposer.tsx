import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AssistantComposer: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mt-auto border-t border-border px-3.5 py-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

AssistantComposer.displayName = 'AssistantComposer';

export { AssistantComposer };
