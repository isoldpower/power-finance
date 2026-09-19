import { cn, FinanceCard } from "@internal/ui-library";
import { AssistantPanelBadge } from "./panel/AssistantPanelBadge.tsx";
import { AssistantPanelBody } from "./panel/AssistantPanelBody.tsx";
import { AssistantPanelClose } from "./panel/AssistantPanelClose.tsx";
import { AssistantPanelHeader } from "./panel/AssistantPanelHeader.tsx";
import { AssistantPanelHint } from "./panel/AssistantPanelHint.tsx";
import { AssistantPanelStatus } from "./panel/AssistantPanelStatus.tsx";
import { AssistantPanelTitle } from "./panel/AssistantPanelTitle.tsx";
import { AssistantPanelTitles } from "./panel/AssistantPanelTitles.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { AssistantPanelBodyProps } from "./panel/AssistantPanelBody.tsx";
import type { AssistantPanelCloseProps } from "./panel/AssistantPanelClose.tsx";
import type { AssistantPanelHeaderProps } from "./panel/AssistantPanelHeader.tsx";
import type { AssistantPanelHintProps } from "./panel/AssistantPanelHint.tsx";
import type { AssistantPanelTitleProps } from "./panel/AssistantPanelTitle.tsx";
import type { AssistantPanelTitlesProps } from "./panel/AssistantPanelTitles.tsx";


type AssistantPanelProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type AssistantPanelObject = FC<AssistantPanelProps> & {
	Badge: FC;
	Body: FC<AssistantPanelBodyProps>;
	Close: FC<AssistantPanelCloseProps>;
	Header: FC<AssistantPanelHeaderProps>;
	Hint: FC<AssistantPanelHintProps>;
	Status: FC;
	Title: FC<AssistantPanelTitleProps>;
	Titles: FC<AssistantPanelTitlesProps>;
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

AssistantPanel.Badge = AssistantPanelBadge;
AssistantPanel.Body = AssistantPanelBody;
AssistantPanel.Close = AssistantPanelClose;
AssistantPanel.Header = AssistantPanelHeader;
AssistantPanel.Hint = AssistantPanelHint;
AssistantPanel.Status = AssistantPanelStatus;
AssistantPanel.Title = AssistantPanelTitle;
AssistantPanel.Titles = AssistantPanelTitles;
AssistantPanel.displayName = 'AssistantPanel';

export { AssistantPanel };
export type { AssistantPanelProps };
