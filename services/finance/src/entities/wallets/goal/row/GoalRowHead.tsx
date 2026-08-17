import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type GoalRowHeadProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const GoalRowHead: FC<GoalRowHeadProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mb-2.5 flex items-center gap-3"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalRowHead.displayName = 'GoalRowHead';

export { GoalRowHead };
export type { GoalRowHeadProps };
