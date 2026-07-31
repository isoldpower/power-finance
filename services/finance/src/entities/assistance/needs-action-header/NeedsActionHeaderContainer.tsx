import type { BaseHTMLAttributes, FC } from "react";
import { cn } from "@internal/ui-library";


const NeedsActionHeaderContainer: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({ 
	children,
	...props
}) => (
	<div className={cn(
		"flex items-center gap-2.5 border-b border-border bg-[var(--accent-soft)] px-[18px] py-3.5"
	)} {...props}>
		{children}
	</div>
);

NeedsActionHeaderContainer.displayName = 'NeedsActionHeaderContainer';

export { NeedsActionHeaderContainer };
