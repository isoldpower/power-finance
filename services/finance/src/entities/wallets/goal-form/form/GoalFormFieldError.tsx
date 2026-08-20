import { ErrorText } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type GoalFormFieldErrorProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const GoalFormFieldError: FC<GoalFormFieldErrorProps> = ({
	children,
	...props
}) => (
	<ErrorText className="mt-1" {...props}>
		{children}
	</ErrorText>
);

GoalFormFieldError.displayName = 'GoalFormFieldError';

export { GoalFormFieldError };
export type { GoalFormFieldErrorProps };
