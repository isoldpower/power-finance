import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const RuleDialogDescription: FC<Omit<BaseHTMLAttributes<HTMLParagraphElement>, 'className'>> = ({
	children,
	...props
}) => (
	<p
		className={cn(
			"mt-1.5 text-[13px] leading-relaxed text-text-2"
		)}
		{...props}
	>
		{children}
	</p>
);

RuleDialogDescription.displayName = 'RuleDialogDescription';

export { RuleDialogDescription };
