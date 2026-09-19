import type { FC, PropsWithChildren } from "react";


type GoalProgressBarProps = PropsWithChildren;

const GoalProgressBar: FC<GoalProgressBarProps> = ({ children }) => (
	<div className="flex items-center gap-2.5">
		{children}
	</div>
);

GoalProgressBar.displayName = 'GoalProgressBar';

export { GoalProgressBar };
export type { GoalProgressBarProps };
