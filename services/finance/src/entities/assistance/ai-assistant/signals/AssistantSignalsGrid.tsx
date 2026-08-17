import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AssistantSignalsGridProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const AssistantSignalsGrid: FC<AssistantSignalsGridProps> = ({
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
export type { AssistantSignalsGridProps };
