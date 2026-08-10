import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const PlanningStatusSteps: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => (
	<span
		className={cn(
			"hidden font-numeric text-[11px] uppercase tracking-[0.08em] text-text-3 sm:block"
		)}
		{...props}
	>
		{children}
	</span>
);

PlanningStatusSteps.displayName = 'PlanningStatusSteps';

export { PlanningStatusSteps };
