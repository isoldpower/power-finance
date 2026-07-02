import type { FC } from "react";

interface GoalIconProps {
	icon: string;
	color: string;
}

const GoalIcon: FC<GoalIconProps> = ({ icon, color }) => (
	<div className="flex size-9 flex-none items-center justify-center rounded-[10px] text-[15px]" style={{ background: color }}>{icon}</div>
);

GoalIcon.displayName = 'GoalIcon';

export { GoalIcon };
export type { GoalIconProps };
