import { cn } from "@internal/ui-library";
import { GoalsToolbarAction } from "./toolbar/GoalsToolbarAction.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { GoalsToolbarActionProps } from "./toolbar/GoalsToolbarAction.tsx";


type GoalsToolbarProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type GoalsToolbarObject = FC<GoalsToolbarProps> & {
	Action: FC<GoalsToolbarActionProps>;
}

const GoalsToolbar: GoalsToolbarObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex items-center gap-2.5 border-b border-border px-[18px] py-3.5"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalsToolbar.Action = GoalsToolbarAction;
GoalsToolbar.displayName = 'GoalsToolbar';

export { GoalsToolbar };
export type { GoalsToolbarProps };
