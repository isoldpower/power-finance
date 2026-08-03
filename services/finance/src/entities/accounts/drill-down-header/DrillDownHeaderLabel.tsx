import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const DrillDownHeaderLabel: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<span
			className={cn(
				"font-numeric text-[10px] uppercase tracking-[0.12em] text-text-3"
			)}
			{...props}
		>
			{children}
		</span>
	);
}

DrillDownHeaderLabel.displayName = 'DrillDownHeaderLabel';

export { DrillDownHeaderLabel };
