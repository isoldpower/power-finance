import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type GoalFormFieldProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const GoalFormField: FC<GoalFormFieldProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mb-4"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalFormField.displayName = 'GoalFormField';

export { GoalFormField };
export type { GoalFormFieldProps };
