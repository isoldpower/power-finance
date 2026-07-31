import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const ActivityRowSeparator: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<span 
			className={cn(
				"size-[3px] rounded-full bg-text-3"
			)} 
			{...props}
		>
			{children}
		</span>
	);
}

ActivityRowSeparator.displayName = 'ActivityRowSeparator';

export { ActivityRowSeparator };