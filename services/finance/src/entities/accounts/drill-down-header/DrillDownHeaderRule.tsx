import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const DrillDownHeaderRule: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className' | 'children'>> = ({
	...props
}) => {
	return (
		<div
			className={cn(
				"h-px flex-1 bg-border"
			)}
			{...props}
		/>
	);
}

DrillDownHeaderRule.displayName = 'DrillDownHeaderRule';

export { DrillDownHeaderRule };
