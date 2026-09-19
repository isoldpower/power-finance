import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AssistantPanelHeaderProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const AssistantPanelHeader: FC<AssistantPanelHeaderProps> = ({
	children,
	...props
}) => (
	<div className="flex items-center gap-2.5 border-b border-border px-4 py-3.5" {...props}>
		{children}
	</div>
);

AssistantPanelHeader.displayName = 'AssistantPanelHeader';

export { AssistantPanelHeader };
export type { AssistantPanelHeaderProps };
