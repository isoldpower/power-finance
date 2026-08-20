import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AutomationRowBodyProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const AutomationRowBody: FC<AutomationRowBodyProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"min-w-0 flex-1"
		)}
		{...props}
	>
		{children}
	</div>
);

AutomationRowBody.displayName = 'AutomationRowBody';

export { AutomationRowBody };
export type { AutomationRowBodyProps };
