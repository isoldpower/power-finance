import { cn, FinanceCard } from "@internal/ui-library";
import { AssistantComingSoonOverlay } from "./panel/AssistantComingSoonOverlay.tsx";
import { AssistantPanelBody } from "./panel/AssistantPanelBody.tsx";
import { AssistantPanelHeader } from "./panel/AssistantPanelHeader.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { AssistantPanelBodyProps } from "./panel/AssistantPanelBody.tsx";
import type { AssistantPanelHeaderProps } from "./panel/AssistantPanelHeader.tsx";


type AssistantPanelProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type AssistantPanelObject = FC<AssistantPanelProps> & {
	Body: FC<AssistantPanelBodyProps>;
	ComingSoon: FC;
	Header: FC<AssistantPanelHeaderProps>;
}

const AssistantPanel: AssistantPanelObject = ({
	children,
	...props
}) => (
	<FinanceCard
		variant="elevated"
		className={cn(
			"relative flex flex-col overflow-hidden"
		)}
		{...props}
	>
		{children}
	</FinanceCard>
);

AssistantPanel.Body = AssistantPanelBody;
AssistantPanel.ComingSoon = AssistantComingSoonOverlay;
AssistantPanel.Header = AssistantPanelHeader;
AssistantPanel.displayName = 'AssistantPanel';

export { AssistantPanel };
export type { AssistantPanelProps };
