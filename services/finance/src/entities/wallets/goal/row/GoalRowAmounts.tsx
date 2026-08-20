import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type GoalRowAmountsProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const GoalRowAmounts: FC<GoalRowAmountsProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"text-right"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalRowAmounts.displayName = 'GoalRowAmounts';

export { GoalRowAmounts };
export type { GoalRowAmountsProps };
