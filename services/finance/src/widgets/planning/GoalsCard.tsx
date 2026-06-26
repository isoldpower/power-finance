import type { FC } from "react";
import { FinanceCard, FinanceBadge, FinanceMoney } from "@internal/ui-library";

import { MOCK_GOALS } from "./mock.ts";

const GoalsCard: FC = () => {
	return (
		<FinanceCard className="overflow-hidden">
			<div className="flex items-center gap-2.5 border-b border-border px-[18px] py-3.5">
				<span className="text-sm font-semibold">Long-term goals</span>
				<FinanceBadge tone="pos" appearance="soft" size="sm">NEW</FinanceBadge>
				<div className="flex-1" />
				<button type="button" className="text-[12.5px] font-semibold text-primary hover:underline">＋ Add goal</button>
			</div>
			{MOCK_GOALS.map((goal) => (
				<div key={goal.id} className="border-b border-border px-[18px] py-3.5 last:border-b-0">
					<div className="mb-2.5 flex items-center gap-3">
						<div className="flex size-9 flex-none items-center justify-center rounded-[10px] text-[15px]" style={{ background: goal.color }}>{goal.icon}</div>
						<div className="min-w-0 flex-1">
							<div className="text-[13.5px] font-semibold">{goal.name}</div>
							<div className="text-[11px] text-text-3">{goal.monthly} · {goal.eta}</div>
						</div>
						<div className="text-right">
							<span className="font-display text-sm font-semibold">{goal.saved}</span>
							<span className="text-[11px] text-text-3"> / {goal.target}</span>
						</div>
					</div>
					<div className="flex items-center gap-2.5">
						<div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
							<div className="h-full rounded-full bg-[image:var(--accent-grad)]" style={{ width: `${goal.percent.toString()}%` }} />
						</div>
						<FinanceMoney tone="muted" size="sm" className="w-[34px] text-right">{goal.percent}%</FinanceMoney>
					</div>
				</div>
			))}
		</FinanceCard>
	);
};

GoalsCard.displayName = 'GoalsCard';

export { GoalsCard };
