import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AssistantSectionLabel: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mb-2 font-numeric text-[9.5px] tracking-[0.1em] text-text-3"
		)}
		{...props}
	>
		{children}
	</div>
);

AssistantSectionLabel.displayName = 'AssistantSectionLabel';

export { AssistantSectionLabel };
