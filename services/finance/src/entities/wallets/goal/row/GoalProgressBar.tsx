import { FinanceMoney } from "@internal/ui-library";

import type { FC } from "react";


interface GoalProgressBarProps {
	percent: number;
}

const GoalProgressBar: FC<GoalProgressBarProps> = ({ percent }) => (
	<div className="flex items-center gap-2.5">
		<div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
			<div
				className="h-full rounded-full bg-[image:var(--accent-grad)]"
				style={{ width: `${percent.toString()}%` }}
			/>
		</div>
		<FinanceMoney tone="muted" size="sm" className="w-[34px] text-right">
			{percent}%
		</FinanceMoney>
	</div>
);

GoalProgressBar.displayName = 'GoalProgressBar';

export { GoalProgressBar };
export type { GoalProgressBarProps };
