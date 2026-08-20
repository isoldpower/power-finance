import { cn } from "@internal/ui-library";
import { AutomationConditionLine } from "./row/AutomationConditionLine.tsx";
import { AutomationFrequencyBadge } from "./row/AutomationFrequencyBadge.tsx";
import { AutomationIcon } from "./row/AutomationIcon.tsx";
import { AutomationRowBody } from "./row/AutomationRowBody.tsx";
import { AutomationRowTitle } from "./row/AutomationRowTitle.tsx";
import { AutomationStatusBadge } from "./row/AutomationStatusBadge.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { AutomationConditionLineProps } from "./row/AutomationConditionLine.tsx";
import type { AutomationFrequencyBadgeProps } from "./row/AutomationFrequencyBadge.tsx";
import type { AutomationIconProps } from "./row/AutomationIcon.tsx";
import type { AutomationRowBodyProps } from "./row/AutomationRowBody.tsx";
import type { AutomationRowTitleProps } from "./row/AutomationRowTitle.tsx";
import type { AutomationStatusBadgeProps } from "./row/AutomationStatusBadge.tsx";


type AutomationRowProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type AutomationRowObject = FC<AutomationRowProps> & {
	Body: FC<AutomationRowBodyProps>;
	ConditionLine: FC<AutomationConditionLineProps>;
	FrequencyBadge: FC<AutomationFrequencyBadgeProps>;
	Icon: FC<AutomationIconProps>;
	StatusBadge: FC<AutomationStatusBadgeProps>;
	Title: FC<AutomationRowTitleProps>;
}

const AutomationRow: AutomationRowObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"fx-slidein flex items-center gap-3 border-b border-border px-[18px] py-3.5",
			"last:border-b-0 hover:bg-secondary"
		)}
		{...props}
	>
		{children}
	</div>
);

AutomationRow.Body = AutomationRowBody;
AutomationRow.ConditionLine = AutomationConditionLine;
AutomationRow.FrequencyBadge = AutomationFrequencyBadge;
AutomationRow.Icon = AutomationIcon;
AutomationRow.StatusBadge = AutomationStatusBadge;
AutomationRow.Title = AutomationRowTitle;
AutomationRow.displayName = 'AutomationRow';

export { AutomationRow };
export type { AutomationRowProps };
