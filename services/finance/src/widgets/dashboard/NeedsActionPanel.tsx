import type { FC } from "react";
import { FinanceCard, FinanceButton } from "@internal/ui-library";

// TODO wire to backend
const MOCK_NEEDS_ACTION = [
	{
		id: 'recurring',
		icon: '↻',
		iconClass: 'bg-accent-soft text-primary',
		title: 'Confirm recurring rent — $1,450.00',
		subtitle: 'Detected on Main Checking · due Jun 30',
		primary: 'Approve',
		secondary: 'Skip',
	},
	{
		id: 'duplicate',
		icon: '⧉',
		iconClass: 'bg-[var(--warn-soft)] text-warn',
		title: 'Possible duplicate — Coffee $4.80',
		subtitle: 'Two matching charges 2 minutes apart',
		primary: 'Merge',
		secondary: 'Keep both',
	},
	{
		id: 'uncategorized',
		icon: '?',
		iconClass: 'bg-[var(--viol-soft)] text-viol',
		title: '3 transactions need a category',
		subtitle: 'Categorize to keep reports accurate',
		primary: 'Review',
		secondary: 'Later',
	},
];

const NeedsActionPanel: FC = () => {
	return (
		<FinanceCard variant="accent" className="overflow-hidden">
			<div className="flex items-center gap-2.5 border-b border-border bg-accent-soft px-[18px] py-3.5">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M12 9v4" />
					<path d="M12 17h.01" />
					<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
				</svg>
				<span className="text-[14.5px] font-semibold">Needs your action</span>
				<span className="rounded-full bg-primary px-2.5 py-0.5 text-[11.5px] font-bold text-white">
					{MOCK_NEEDS_ACTION.length}
				</span>
				<div className="flex-1" />
				<span className="hidden font-numeric text-[11px] text-text-3 sm:block">approvals before money moves</span>
			</div>
			{MOCK_NEEDS_ACTION.map((action) => (
				<div key={action.id} className="flex items-center gap-3.5 border-b border-border px-[18px] py-3.5 last:border-b-0 hover:bg-secondary">
					<div className={`flex size-[34px] flex-none items-center justify-center rounded-[9px] text-[15px] font-bold ${action.iconClass}`}>
						{action.icon}
					</div>
					<div className="min-w-0 flex-1">
						<div className="text-[13.5px] font-semibold">{action.title}</div>
						<div className="mt-px text-xs text-text-2">{action.subtitle}</div>
					</div>
					<FinanceButton variant="outline" size="sm" className="flex-none">{action.secondary}</FinanceButton>
					<FinanceButton size="sm" className="flex-none">{action.primary}</FinanceButton>
				</div>
			))}
		</FinanceCard>
	);
};

NeedsActionPanel.displayName = 'NeedsActionPanel';

export { NeedsActionPanel };
