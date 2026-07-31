import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const ActivityRowTitle: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<div 
			className={cn(
				"text-[13.5px] font-semibold"
			)} 
			{...props}
		>
			{children}
		</div>
	);
}

ActivityRowTitle.displayName = 'ActivityRowTitle';

export { ActivityRowTitle };