import { useMemo } from "react";

import { GoalIcon, GoalProgressBar, toGoalView } from "@entity/wallets";
import { useLocaleCurrency } from "@shared/utils";

import type { CSSProperties, FC, ReactNode } from "react";
import type { GoalWallet } from "@entity/wallets";

interface GoalRowProps {
	wallet: GoalWallet;
	style?: CSSProperties;
	deleteSlot: ReactNode;
}

const GoalRow: FC<GoalRowProps> = ({ wallet, style, deleteSlot }) => {
	const formatCurrency = useLocaleCurrency();

	const goal = useMemo(() => toGoalView(wallet, formatCurrency), [wallet, formatCurrency]);

	return (
		<div style={style} className="fx-slidein border-b border-border px-[18px] py-3.5 last:border-b-0">
			<div className="mb-2.5 flex items-center gap-3">
				<GoalIcon icon={goal.icon} color={goal.color} />
				<div className="min-w-0 flex-1">
					<div className="text-[13.5px] font-semibold">{goal.name}</div>
					<div className="text-[11px] text-text-3">{goal.monthly} · {goal.eta}</div>
				</div>
				<div className="text-right">
					<span className="font-display text-sm font-semibold">{goal.saved}</span>
					<span className="text-[11px] text-text-3"> / {goal.target}</span>
				</div>
				{deleteSlot}
			</div>
			<GoalProgressBar percent={goal.percent} />
		</div>
	);
};

GoalRow.displayName = 'GoalRow';

export { GoalRow };
export type { GoalRowProps };
