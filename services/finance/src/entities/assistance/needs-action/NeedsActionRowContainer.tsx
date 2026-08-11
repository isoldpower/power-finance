import type { BaseHTMLAttributes, FC } from "react";
import {cn} from "@internal/ui-library";


const NeedsActionRowContainer: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({ 
	children,
	...props
}) => (
	<div 
		className={cn(
			"flex items-center gap-3.5 border-b border-border",
			"px-[18px] py-3.5 last:border-b-0 hover:bg-secondary"
		)} 
		{...props}
	>
		{children}
	</div>
);

NeedsActionRowContainer.displayName = 'NeedsActionRowContainer';

export { NeedsActionRowContainer };