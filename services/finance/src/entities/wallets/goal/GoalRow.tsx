import { cn } from "@internal/ui-library";
import { GoalIcon } from "./row/GoalIcon.tsx";
import { GoalProgressBar } from "./row/GoalProgressBar.tsx";
import { GoalRowAmounts } from "./row/GoalRowAmounts.tsx";
import { GoalRowBody } from "./row/GoalRowBody.tsx";
import { GoalRowHead } from "./row/GoalRowHead.tsx";
import { GoalRowTarget } from "./row/GoalRowTarget.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { GoalIconProps } from "./row/GoalIcon.tsx";
import type { GoalProgressBarProps } from "./row/GoalProgressBar.tsx";
import type { GoalRowAmountsProps } from "./row/GoalRowAmounts.tsx";
import type { GoalRowBodyProps } from "./row/GoalRowBody.tsx";
import type { GoalRowHeadProps } from "./row/GoalRowHead.tsx";
import type { GoalRowTargetProps } from "./row/GoalRowTarget.tsx";


type GoalRowProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type GoalRowObject = FC<GoalRowProps> & {
	Amounts: FC<GoalRowAmountsProps>;
	Body: FC<GoalRowBodyProps>;
	Head: FC<GoalRowHeadProps>;
	Icon: FC<GoalIconProps>;
	ProgressBar: FC<GoalProgressBarProps>;
	Target: FC<GoalRowTargetProps>;
}

const GoalRow: GoalRowObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"fx-slidein border-b border-border px-[18px] py-3.5 last:border-b-0"
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
GoalRow.Target = GoalRowTarget;
GoalRow.displayName = 'GoalRow';

export { GoalRow };
export type { GoalRowProps };
