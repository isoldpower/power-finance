import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const DrillDownHeaderContainer: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"mx-0.5 mb-2.5 flex items-center gap-2.5"
			)}
			{...props}
		>
			{children}
		</div>
	);
}

DrillDownHeaderContainer.displayName = 'DrillDownHeaderContainer';

export { DrillDownHeaderContainer };
