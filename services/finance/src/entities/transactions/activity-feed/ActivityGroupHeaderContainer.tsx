import type { BaseHTMLAttributes, FC } from "react";
import { cn } from "@internal/ui-library";


const ActivityGroupHeaderContainer: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div 
			className={cn(
				"flex items-center justify-between border-b",
				"border-border bg-secondary px-[18px] py-2.5"
			)} 
			{...props}
		>
			{children}
		</div>
	);
}

ActivityGroupHeaderContainer.displayName = 'ActivityGroupHeaderContainer';

export { ActivityGroupHeaderContainer };