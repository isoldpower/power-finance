import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const DrillDownHeaderCaption: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<span
			className={cn(
				"text-[12.5px] text-text-3"
			)}
			{...props}
		>
			{children}
		</span>
	);
}

DrillDownHeaderCaption.displayName = 'DrillDownHeaderCaption';

export { DrillDownHeaderCaption };
