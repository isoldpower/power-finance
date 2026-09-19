import { cn } from "@internal/ui-library";
import { pendingClass } from "@shared/pure-components/feedback";
import { GoalIcon } from "./row/GoalIcon.tsx";
import { GoalProgressBar } from "./row/GoalProgressBar.tsx";
import { GoalProgressFill } from "./row/GoalProgressFill.tsx";
import { GoalProgressTrack } from "./row/GoalProgressTrack.tsx";
import { GoalProgressValue } from "./row/GoalProgressValue.tsx";
import { GoalRowAmounts } from "./row/GoalRowAmounts.tsx";
import { GoalRowBody } from "./row/GoalRowBody.tsx";
import { GoalRowHead } from "./row/GoalRowHead.tsx";
import { GoalRowTarget } from "./row/GoalRowTarget.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { GoalIconProps } from "./row/GoalIcon.tsx";
import type { GoalProgressBarProps } from "./row/GoalProgressBar.tsx";
import type { GoalProgressFillProps } from "./row/GoalProgressFill.tsx";
import type { GoalProgressTrackProps } from "./row/GoalProgressTrack.tsx";
import type { GoalProgressValueProps } from "./row/GoalProgressValue.tsx";
import type { GoalRowAmountsProps } from "./row/GoalRowAmounts.tsx";
import type { GoalRowBodyProps } from "./row/GoalRowBody.tsx";
import type { GoalRowHeadProps } from "./row/GoalRowHead.tsx";
import type { GoalRowTargetProps } from "./row/GoalRowTarget.tsx";


type GoalRowProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> & {
	pending?: boolean;
}>;
type GoalRowObject = FC<GoalRowProps> & {
	Amounts: FC<GoalRowAmountsProps>;
	Body: FC<GoalRowBodyProps>;
	Head: FC<GoalRowHeadProps>;
	Icon: FC<GoalIconProps>;
	ProgressBar: FC<GoalProgressBarProps>;
	ProgressFill: FC<GoalProgressFillProps>;
	ProgressTrack: FC<GoalProgressTrackProps>;
	ProgressValue: FC<GoalProgressValueProps>;
	Target: FC<GoalRowTargetProps>;
}

const GoalRow: GoalRowObject = ({
	children,
	pending = false,
	...props
}) => (
	<div
		className={cn(
			"fx-slidein border-b border-border px-[18px] py-3.5 last:border-b-0",
			pendingClass(pending)
		)}
		{...props}
	>
		{children}
	</div>
);

GoalRow.Amounts = GoalRowAmounts;
GoalRow.Body = GoalRowBody;
GoalRow.Head = GoalRowHead;
GoalRow.Icon = GoalIcon;
GoalRow.ProgressBar = GoalProgressBar;
GoalRow.ProgressFill = GoalProgressFill;
GoalRow.ProgressTrack = GoalProgressTrack;
GoalRow.ProgressValue = GoalProgressValue;
GoalRow.Target = GoalRowTarget;
GoalRow.displayName = 'GoalRow';

export { GoalRow };
export type { GoalRowProps };
