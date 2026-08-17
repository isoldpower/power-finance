import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type GoalSkeletonProgressProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;

const GoalSkeletonProgress: FC<GoalSkeletonProgressProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex h-5 items-center gap-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalSkeletonProgress.displayName = 'GoalSkeletonProgress';

export { GoalSkeletonProgress };
export type { GoalSkeletonProgressProps };
