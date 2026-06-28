import type { FC } from "react";
import { Link } from "@tanstack/react-router";
import { getFinanceRoute } from "@internal/shared";
import { cn, FinanceCard } from "@internal/ui-library";

import { useRecentActivityGroups } from "@feature/transaction";
import { ActivityRow, ActivityDayHeader } from "@entity/transaction";

interface RecentActivityPanelProps {
	className?: string;
}

const RecentActivityPanel: FC<RecentActivityPanelProps> = ({ className }) => {
	const { groups, isPending, convert, formatCurrency, targetCurrency } = useRecentActivityGroups();

	return (
		<FinanceCard className={cn("overflow-hidden", className)}>
			<div className="flex items-center gap-2.5 border-b border-border px-[18px] py-3.5">
				<span className="text-sm font-semibold">Recent activity</span>
				<div className="flex-1" />
				<Link to={getFinanceRoute('management')} className="text-[12.5px] font-semibold text-primary hover:underline">
					View all in Management →
				</Link>
			</div>

			{isPending ? (
				<div className="px-[18px] py-8 text-center text-[13px] text-text-3">Loading…</div>
			) : groups.length === 0 ? (
				<div className="px-[18px] py-8 text-center text-[13px] text-text-3">No recent activity.</div>
			) : (
				groups.map((group) => (
					<div key={group.label}>
						<ActivityDayHeader
							label={group.label}
							sumFormatted={formatCurrency(group.sum, targetCurrency)}
							positive={group.sum >= 0}
						/>
						{group.rows.map((row) => (
							<ActivityRow
								key={row.id}
								icon={row.icon}
								iconClass={row.iconClass}
								walletName={row.walletName}
								category={row.category}
								time={row.time}
								date={row.date}
								amount={row.amount}
								currency={row.currency}
								tone={row.tone}
								convert={convert}
								format={formatCurrency}
							/>
						))}
					</div>
				))
			)}
		</FinanceCard>
	);
};

RecentActivityPanel.displayName = 'RecentActivityPanel';

export { RecentActivityPanel };
