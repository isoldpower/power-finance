import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const ActivityRowContainer: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div 
			className={cn(
				"flex cursor-pointer items-center gap-3 border-b border-border",
				"px-[18px] py-2.5 last:border-b-0 hover:bg-secondary",
			)} 
			{...props}
		>
			{children}
		</div>
	);
}

ActivityRowContainer.displayName = 'ActivityRowContainer';

export { ActivityRowContainer };