import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AssistantSheet: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"fixed inset-x-3 bottom-3 top-16 z-[41] flex animate-in slide-in-from-bottom duration-200"
		)}
		{...props}
	>
		{children}
	</div>
);

AssistantSheet.displayName = 'AssistantSheet';

export { AssistantSheet };
