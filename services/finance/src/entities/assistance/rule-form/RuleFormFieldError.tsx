import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


interface RuleFormFieldErrorProps extends Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> {
	spaced?: boolean;
}

const RuleFormFieldError: FC<RuleFormFieldErrorProps> = ({
	children,
	spaced = true,
	...props
}) => (
	<div
		className={cn(
			"text-[11.5px] text-neg",
			spaced ? "-mt-3 mb-4" : "mt-1"
		)}
		{...props}
	>
		{children}
	</div>
);

RuleFormFieldError.displayName = 'RuleFormFieldError';

export { RuleFormFieldError };
export type { RuleFormFieldErrorProps };
