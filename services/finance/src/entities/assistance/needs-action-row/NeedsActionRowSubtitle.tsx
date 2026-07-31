import type { BaseHTMLAttributes, FC } from "react";
import { cn } from "@internal/ui-library";


const NeedsActionRowSubtitle: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({ 
	children,
	...props
}) => (
	<p 
		className={cn(
			"mt-px text-xs text-text-2"
		)} 
		{...props}
	>
		{children}
	</p>
);

NeedsActionRowSubtitle.displayName = 'NeedsActionRowSubtitle';

export { NeedsActionRowSubtitle };