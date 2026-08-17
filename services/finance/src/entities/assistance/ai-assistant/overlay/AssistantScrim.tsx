import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AssistantScrimProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const AssistantScrim: FC<AssistantScrimProps> = ({
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
export type { AssistantScrimProps };
