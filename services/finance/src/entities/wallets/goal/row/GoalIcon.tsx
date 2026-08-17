import { resolveGoalIcon } from "../../visual-map";

import type { FC } from "react";


interface GoalIconProps {
	icon: string;
	color: string;
}

const GoalIcon: FC<GoalIconProps> = ({ icon, color }) => {
	const Icon = resolveGoalIcon(icon);

	return (
		<div
			className="flex size-9 flex-none items-center justify-center rounded-[10px] text-white"
			style={{ background: color }}
		>
			<Icon size={17} />
		</div>
	);
};

GoalIcon.displayName = 'GoalIcon';

export { GoalIcon };
export type { GoalIconProps };
