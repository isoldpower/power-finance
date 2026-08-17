import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type RuleConditionRowProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const RuleConditionRow: FC<RuleConditionRowProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex items-center gap-1.5"
		)}
		{...props}
	>
		{children}
	</div>
);

RuleConditionRow.displayName = 'RuleConditionRow';

export { RuleConditionRow };
export type { RuleConditionRowProps };
