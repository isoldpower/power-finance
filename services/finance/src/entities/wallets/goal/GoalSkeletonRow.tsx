import { cn } from "@internal/ui-library";
import { GoalSkeletonAmounts } from "./skeleton-row/GoalSkeletonAmounts.tsx";
import { GoalSkeletonBar } from "./skeleton-row/GoalSkeletonBar.tsx";
import { GoalSkeletonBody } from "./skeleton-row/GoalSkeletonBody.tsx";
import { GoalSkeletonEta } from "./skeleton-row/GoalSkeletonEta.tsx";
import { GoalSkeletonHead } from "./skeleton-row/GoalSkeletonHead.tsx";
import { GoalSkeletonIcon } from "./skeleton-row/GoalSkeletonIcon.tsx";
import { GoalSkeletonName } from "./skeleton-row/GoalSkeletonName.tsx";
import { GoalSkeletonPercent } from "./skeleton-row/GoalSkeletonPercent.tsx";
import { GoalSkeletonProgress } from "./skeleton-row/GoalSkeletonProgress.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { GoalSkeletonBodyProps } from "./skeleton-row/GoalSkeletonBody.tsx";
import type { GoalSkeletonHeadProps } from "./skeleton-row/GoalSkeletonHead.tsx";
import type { GoalSkeletonProgressProps } from "./skeleton-row/GoalSkeletonProgress.tsx";


type GoalSkeletonRowProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type GoalSkeletonRowObject = FC<GoalSkeletonRowProps> & {
	Amounts: FC;
	Bar: FC;
	Body: FC<GoalSkeletonBodyProps>;
	Eta: FC;
	Head: FC<GoalSkeletonHeadProps>;
	Icon: FC;
	Name: FC;
	Percent: FC;
	Progress: FC<GoalSkeletonProgressProps>;
}

const GoalSkeletonRow: GoalSkeletonRowObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"border-b border-border px-[18px] py-3.5 last:border-b-0"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalSkeletonRow.Amounts = GoalSkeletonAmounts;
GoalSkeletonRow.Bar = GoalSkeletonBar;
GoalSkeletonRow.Body = GoalSkeletonBody;
GoalSkeletonRow.Eta = GoalSkeletonEta;
GoalSkeletonRow.Head = GoalSkeletonHead;
GoalSkeletonRow.Icon = GoalSkeletonIcon;
GoalSkeletonRow.Name = GoalSkeletonName;
GoalSkeletonRow.Percent = GoalSkeletonPercent;
GoalSkeletonRow.Progress = GoalSkeletonProgress;
GoalSkeletonRow.displayName = 'GoalSkeletonRow';

export { GoalSkeletonRow };
export type { GoalSkeletonRowProps };
