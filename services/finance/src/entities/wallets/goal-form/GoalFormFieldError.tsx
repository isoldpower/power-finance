
import type { BaseHTMLAttributes, FC } from "react";
import { ErrorText } from "@shared/pure-components/typography";


const GoalFormFieldError: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<ErrorText
			className="mt-1"
			{...props}
		>
		{children}
	</ErrorText>
);

GoalFormFieldError.displayName = 'GoalFormFieldError';

export { GoalFormFieldError };
