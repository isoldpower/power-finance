import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const ActivityRowBody: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div 
			className={cn(
				"flex items-center gap-1.5 text-[11.5px] text-text-3"
			)} 
			{...props}
		>
			{children}
		</div>
	);
}

ActivityRowBody.displayName = 'ActivityRowBody';

export { ActivityRowBody };