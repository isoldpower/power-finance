import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type GoalRowBodyProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const GoalRowBody: FC<GoalRowBodyProps> = ({
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

GoalRowBody.displayName = 'GoalRowBody';

export { GoalRowBody };
export type { GoalRowBodyProps };
