import type { BaseHTMLAttributes, FC } from "react";
import { cn } from "@internal/ui-library";


const NeedsActionHeaderBadge: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({ 
	children,
	...props
}) => (
	<span 
		className={cn(
			"inline-flex items-center rounded-full bg-primary px-2.5 py-0.5",
			"text-[11.5px] font-semibold text-white"
		)} 
		{...props}
	>
		{children}
	</span>
);

NeedsActionHeaderBadge.displayName = 'NeedsActionHeaderBadge';

export { NeedsActionHeaderBadge };
