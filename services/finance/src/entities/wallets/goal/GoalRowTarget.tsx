
import type { BaseHTMLAttributes, FC } from "react";
import { Caption } from "@shared/pure-components/typography";


const GoalRowTarget: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => (
	<Caption
			as="span"
			size="11"
			{...props}
		>
		{' / '}
		{children}
	</Caption>
);

GoalRowTarget.displayName = 'GoalRowTarget';

export { GoalRowTarget };
