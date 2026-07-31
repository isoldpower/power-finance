import type { BaseHTMLAttributes, FC } from "react";
import { cn } from "@internal/ui-library";


const NeedsActionRowTitle: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({ 
	children,
	...props
}) => (
	<div 
		className={cn(
			"text-[13.5px] font-semibold"
		)} 
		{...props}
	>
		{children}
	</div>
);

NeedsActionRowTitle.displayName = 'NeedsActionRowTitle';

export { NeedsActionRowTitle };