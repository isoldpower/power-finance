import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const AutomationsEmptyNotice: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"px-[18px] py-6 text-center text-[13px] text-text-3"
		)}
		{...props}
	>
		{children}
	</div>
);

AutomationsEmptyNotice.displayName = 'AutomationsEmptyNotice';

export { AutomationsEmptyNotice };
