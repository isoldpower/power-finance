import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type GoalDialogOptionsProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const GoalDialogOptions: FC<GoalDialogOptionsProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mt-4 space-y-2"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalDialogOptions.displayName = 'GoalDialogOptions';

export { GoalDialogOptions };
export type { GoalDialogOptionsProps };
