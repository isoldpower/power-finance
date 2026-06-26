import type { FC } from "react";
import { Link } from "@tanstack/react-router";
import { getFinanceRoute } from "@internal/shared";
import { FinanceCard, FinanceMoney } from "@internal/ui-library";

// TODO wire to backend
const MOCK_GROUPS = [
	{
		label: 'Today',
		sum: '−$58.30',
		tone: 'neg' as const,
		items: [
			{ id: 't1', icon: '☕', iconClass: 'bg-[var(--warn-soft)] text-warn', desc: 'Blue Bottle Coffee', wallet: 'Main Checking', category: 'Dining', amount: '−$4.80', tone: 'neg' as const, time: '08:14' },
			{ id: 't2', icon: '🛒', iconClass: 'bg-[var(--viol-soft)] text-viol', desc: 'Whole Foods Market', wallet: 'Amex Gold', category: 'Groceries', amount: '−$53.50', tone: 'neg' as const, time: '10:42' },
		],
	},
	{
		label: 'Yesterday',
		sum: '+$4,141.70',
		tone: 'pos' as const,
		items: [
			{ id: 't3', icon: '💼', iconClass: 'bg-pos-soft text-pos', desc: 'Acme Corp Salary', wallet: 'Main Checking', category: 'Income', amount: '+$4,200.00', tone: 'pos' as const, time: '09:00' },
			{ id: 't4', icon: '🚇', iconClass: 'bg-accent-soft text-primary', desc: 'Metro Transit', wallet: 'Main Checking', category: 'Transport', amount: '−$58.30', tone: 'neg' as const, time: '18:21' },
		],
	},
];

const RecentActivityPanel: FC = () => {
	return (
		<FinanceCard className="overflow-hidden">
			<div className="flex items-center gap-2.5 border-b border-border px-[18px] py-3.5">
				<span className="text-sm font-semibold">Recent activity</span>
				<div className="flex-1" />
				<Link to={getFinanceRoute('management')} className="text-[12.5px] font-semibold text-primary hover:underline">
					View all in Management →
				</Link>
			</div>
			{MOCK_GROUPS.map((group) => (
				<div key={group.label}>
					<div className="flex items-center justify-between border-b border-border bg-secondary px-[18px] py-2.5">
						<span className="font-numeric text-[10px] uppercase tracking-[0.1em] text-text-3">{group.label}</span>
						<FinanceMoney tone={group.tone} size="sm">{group.sum}</FinanceMoney>
					</div>
					{group.items.map((item) => (
						<div key={item.id} className="flex cursor-pointer items-center gap-3 border-b border-border px-[18px] py-2.5 last:border-b-0 hover:bg-secondary">
							<div className={`flex size-8 flex-none items-center justify-center rounded-[8px] ${item.iconClass}`}>{item.icon}</div>
							<div className="min-w-0 flex-1">
								<div className="text-[13.5px] font-semibold">{item.desc}</div>
								<div className="flex items-center gap-1.5 text-[11.5px] text-text-3">
									<span>{item.wallet}</span>
									<span className="size-[3px] rounded-full bg-text-3" />
									<span>{item.category}</span>
								</div>
							</div>
							<div className="text-right">
								<FinanceMoney tone={item.tone} size="sm" className="block">{item.amount}</FinanceMoney>
								<div className="font-numeric text-[10.5px] text-text-3">{item.time}</div>
							</div>
						</div>
					))}
				</div>
			))}
		</FinanceCard>
	);
};

RecentActivityPanel.displayName = 'RecentActivityPanel';

export { RecentActivityPanel };
