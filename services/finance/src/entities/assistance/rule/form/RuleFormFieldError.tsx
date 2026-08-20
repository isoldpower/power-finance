import { cn } from "@internal/ui-library";
import { ErrorText } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type RuleFormFieldErrorProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> & {
	spaced?: boolean;
}>;

const RuleFormFieldError: FC<RuleFormFieldErrorProps> = ({
	children,
	spaced = true,
	...props
}) => (
	<ErrorText
		className={cn(
			spaced ? "-mt-3 mb-4" : "mt-1"
		)}
		{...props}
	>
		{children}
	</ErrorText>
);

RuleFormFieldError.displayName = 'RuleFormFieldError';

export { RuleFormFieldError };
export type { RuleFormFieldErrorProps };
