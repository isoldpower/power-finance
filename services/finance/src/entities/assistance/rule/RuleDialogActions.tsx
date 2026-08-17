import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type RuleDialogActionsProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const RuleDialogActions: FC<RuleDialogActionsProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mt-5 flex gap-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

RuleDialogActions.displayName = 'RuleDialogActions';

export { RuleDialogActions };
export type { RuleDialogActionsProps };
