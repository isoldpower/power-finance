import type { BaseHTMLAttributes, FC } from "react";
import { cn } from "@internal/ui-library";


const ActivityGroupHeaderLabel: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<span 
			className={cn(
				"font-numeric text-[10px] uppercase tracking-[0.1em] text-text-3",
			)} 
			{...props}
		>
			{children}
		</span>
	);
}

ActivityGroupHeaderLabel.displayName = 'ActivityGroupHeaderLabel';

export { ActivityGroupHeaderLabel };