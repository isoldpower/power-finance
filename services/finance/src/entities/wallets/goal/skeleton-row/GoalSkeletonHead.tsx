import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type GoalSkeletonHeadProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const GoalSkeletonHead: FC<GoalSkeletonHeadProps> = ({
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

GoalSkeletonHead.displayName = 'GoalSkeletonHead';

export { GoalSkeletonHead };
export type { GoalSkeletonHeadProps };
