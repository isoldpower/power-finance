import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AssistantPanelBodyProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> & {
	muted?: boolean;
}>;

const AssistantPanelBody: FC<AssistantPanelBodyProps> = ({
	children,
	muted = false,
	...props
}) => (
	<div
		aria-hidden={muted}
		className={cn(
			"flex flex-1 flex-col",
			muted && "pointer-events-none select-none"
		)}
		{...props}
	>
		{children}
	</div>
);

AssistantPanelBody.displayName = 'AssistantPanelBody';

export { AssistantPanelBody };
export type { AssistantPanelBodyProps };
