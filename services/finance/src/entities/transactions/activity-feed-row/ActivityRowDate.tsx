import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const ActivityRowDate: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div 
			className={cn(
				"font-numeric text-[10.5px] text-text-3"
			)} 
			{...props}
		>
			{children}
		</div>
	);
}

ActivityRowDate.displayName = 'ActivityRowDate';

export { ActivityRowDate };