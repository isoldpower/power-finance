import { cn } from "@internal/ui-library";
import { AutomationsToolbarAction } from "./toolbar/AutomationsToolbarAction.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { AutomationsToolbarActionProps } from "./toolbar/AutomationsToolbarAction.tsx";


type AutomationsToolbarProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type AutomationsToolbarObject = FC<AutomationsToolbarProps> & {
	Action: FC<AutomationsToolbarActionProps>;
}

const AutomationsToolbar: AutomationsToolbarObject = ({
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

AutomationsToolbar.Action = AutomationsToolbarAction;
AutomationsToolbar.displayName = 'AutomationsToolbar';

export { AutomationsToolbar };
export type { AutomationsToolbarProps };
