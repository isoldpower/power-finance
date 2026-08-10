import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const RuleFormBody: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex-1 overflow-auto p-5"
		)}
		{...props}
	>
		{children}
	</div>
);

RuleFormBody.displayName = 'RuleFormBody';

export { RuleFormBody };
