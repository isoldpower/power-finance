import { Caption } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type GoalRowTargetProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>>;

const GoalRowTarget: FC<GoalRowTargetProps> = ({
	children,
	...props
}) => (
	<Caption as="span" size="11" {...props}>
		{' / '}
		{children}
	</Caption>
);

GoalRowTarget.displayName = 'GoalRowTarget';

export { GoalRowTarget };
export type { GoalRowTargetProps };
