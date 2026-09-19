import type { FC, PropsWithChildren } from "react";


type GoalProgressTrackProps = PropsWithChildren;

const GoalProgressTrack: FC<GoalProgressTrackProps> = ({ children }) => (
	<div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
		{children}
	</div>
);

GoalProgressTrack.displayName = 'GoalProgressTrack';

export { GoalProgressTrack };
export type { GoalProgressTrackProps };
