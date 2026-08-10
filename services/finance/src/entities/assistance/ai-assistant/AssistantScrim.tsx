import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AssistantScrim: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-150"
		)}
		{...props}
	>
		{children}
	</div>
);

AssistantScrim.displayName = 'AssistantScrim';

export { AssistantScrim };
