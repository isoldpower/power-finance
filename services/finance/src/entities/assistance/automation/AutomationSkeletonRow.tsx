import { cn } from "@internal/ui-library";
import { AutomationSkeletonBody } from "./skeleton-row/AutomationSkeletonBody.tsx";
import { AutomationSkeletonConditionLine } from "./skeleton-row/AutomationSkeletonConditionLine.tsx";
import { AutomationSkeletonIcon } from "./skeleton-row/AutomationSkeletonIcon.tsx";
import { AutomationSkeletonTitle } from "./skeleton-row/AutomationSkeletonTitle.tsx";
import { AutomationSkeletonToggle } from "./skeleton-row/AutomationSkeletonToggle.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { AutomationSkeletonBodyProps } from "./skeleton-row/AutomationSkeletonBody.tsx";


type AutomationSkeletonRowProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>
>;
type AutomationSkeletonRowObject = FC<AutomationSkeletonRowProps> & {
	Body: FC<AutomationSkeletonBodyProps>;
	ConditionLine: FC;
	Icon: FC;
	Title: FC;
	Toggle: FC;
}

const AutomationSkeletonRow: AutomationSkeletonRowObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex items-center gap-3 border-b border-border px-[18px] py-3.5 last:border-b-0"
		)}
		{...props}
	>
		{children}
	</div>
);

AutomationSkeletonRow.Body = AutomationSkeletonBody;
AutomationSkeletonRow.ConditionLine = AutomationSkeletonConditionLine;
AutomationSkeletonRow.Icon = AutomationSkeletonIcon;
AutomationSkeletonRow.Title = AutomationSkeletonTitle;
AutomationSkeletonRow.Toggle = AutomationSkeletonToggle;
AutomationSkeletonRow.displayName = 'AutomationSkeletonRow';

export { AutomationSkeletonRow };
export type { AutomationSkeletonRowProps };
