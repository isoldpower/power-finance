import { cn } from "@internal/ui-library";
import { Text } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type PlanningStatusSyncBadgeProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>
>;

const PlanningStatusSyncBadge: FC<PlanningStatusSyncBadgeProps> = ({
	children,
	...props
}) => (
	<Text
		size="11.5"
		weight="semibold"
		tone="positive"
		className={cn(
			"fx-slidein inline-flex cursor-default items-center gap-1.5",
			"rounded-full bg-pos-soft px-2.5 py-1"
		)}
		{...props}
	>
		{children}
	</Text>
);

PlanningStatusSyncBadge.displayName = 'PlanningStatusSyncBadge';

export { PlanningStatusSyncBadge };
export type { PlanningStatusSyncBadgeProps };
