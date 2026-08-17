import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type GoalSkeletonBodyProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const GoalSkeletonBody: FC<GoalSkeletonBodyProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"min-w-0 flex-1 space-y-1.5"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalSkeletonBody.displayName = 'GoalSkeletonBody';

export { GoalSkeletonBody };
export type { GoalSkeletonBodyProps };
