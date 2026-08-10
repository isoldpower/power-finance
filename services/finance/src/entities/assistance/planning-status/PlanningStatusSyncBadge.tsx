import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const PlanningStatusSyncBadge: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => (
	<span
		className={cn(
			"fx-slidein inline-flex cursor-default items-center gap-1.5 rounded-full bg-pos-soft px-2.5 py-1",
			"text-[11.5px] font-semibold text-pos"
		)}
		{...props}
	>
		{children}
	</span>
);

PlanningStatusSyncBadge.displayName = 'PlanningStatusSyncBadge';

export { PlanningStatusSyncBadge };
