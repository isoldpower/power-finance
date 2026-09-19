import type { FC } from "react";


interface GoalProgressFillProps {
	percent: number;
}

const GoalProgressFill: FC<GoalProgressFillProps> = ({ percent }) => (
	<div
		className="h-full rounded-full bg-[image:var(--accent-grad)]"
		style={{ width: `${percent.toString()}%` }}
	/>
);

GoalProgressFill.displayName = 'GoalProgressFill';

export { GoalProgressFill };
export type { GoalProgressFillProps };
