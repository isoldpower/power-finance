import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AssistantPanelTitlesProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const AssistantPanelTitles: FC<AssistantPanelTitlesProps> = ({
	children,
	...props
}) => (
	<div className="flex-1" {...props}>
		{children}
	</div>
);

AssistantPanelTitles.displayName = 'AssistantPanelTitles';

export { AssistantPanelTitles };
export type { AssistantPanelTitlesProps };
