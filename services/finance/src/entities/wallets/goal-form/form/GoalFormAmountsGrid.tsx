import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type GoalFormAmountsGridProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const GoalFormAmountsGrid: FC<GoalFormAmountsGridProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mb-4 grid grid-cols-2 gap-3"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalFormAmountsGrid.displayName = 'GoalFormAmountsGrid';

export { GoalFormAmountsGrid };
export type { GoalFormAmountsGridProps };
