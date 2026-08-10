import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const RuleDialogTitle: FC<Omit<BaseHTMLAttributes<HTMLHeadingElement>, 'className'>> = ({
	children,
	...props
}) => (
	<h2
		className={cn(
			"font-display text-[17px] font-semibold"
		)}
		{...props}
	>
		{children}
	</h2>
);

RuleDialogTitle.displayName = 'RuleDialogTitle';

export { RuleDialogTitle };
