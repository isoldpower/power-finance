import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const RuleDialogActions: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mt-5 flex gap-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

RuleDialogActions.displayName = 'RuleDialogActions';

export { RuleDialogActions };
