import type { FC, ReactNode } from "react";

import { GoalIcon, GoalProgressBar } from "@entity/wallets";

interface GoalRowProps {
	icon: string;
	color: string;
	name: string;
	monthly: string;
	eta: string;
	saved: string;
	target: string;
	percent: number;
	style?: React.CSSProperties;
	deleteSlot: ReactNode;
}

const GoalRow: FC<GoalRowProps> = ({ icon, color, name, monthly, eta, saved, target, percent, style, deleteSlot }) => (
	<div style={style} className="fx-slidein border-b border-border px-[18px] py-3.5 last:border-b-0">
		<div className="mb-2.5 flex items-center gap-3">
			<GoalIcon icon={icon} color={color} />
			<div className="min-w-0 flex-1">
				<div className="text-[13.5px] font-semibold">{name}</div>
				<div className="text-[11px] text-text-3">{monthly} · {eta}</div>
			</div>
			<div className="text-right">
				<span className="font-display text-sm font-semibold">{saved}</span>
				<span className="text-[11px] text-text-3"> / {target}</span>
			</div>
			{deleteSlot}
		</div>
		<GoalProgressBar percent={percent} />
	</div>
);

GoalRow.displayName = 'GoalRow';

export { GoalRow };
export type { GoalRowProps };
