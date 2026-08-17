import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


type DrillDownHeaderRuleProps = Omit<BaseHTMLAttributes<HTMLDivElement>, 'className' | 'children'>;

const DrillDownHeaderRule: FC<DrillDownHeaderRuleProps> = ({ ...props }) => (
	<div
		className={cn(
			"h-px flex-1 bg-border"
		)}
		{...props}
	/>
);

DrillDownHeaderRule.displayName = 'DrillDownHeaderRule';

export { DrillDownHeaderRule };
export type { DrillDownHeaderRuleProps };
