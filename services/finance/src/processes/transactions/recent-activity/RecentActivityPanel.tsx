import type { FC } from "react";
import { cn, FinanceCard } from "@internal/ui-library";

import { useRecentActivityGroups, RecentActivityFx } from "@feature/transactions";
import { RouteLink } from "@feature/navigation";
import { ActivityFeedSkeleton } from "@entity/transactions";
import { ActivityFeed } from "@widget/transactions";


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
				<RouteLink to="management" className="text-[12.5px] font-semibold text-primary hover:underline">
					View all in Management →
				</RouteLink>
			</div>
			<RecentActivityFx isPending={isPending} pending={<ActivityFeedSkeleton />}>
				<ActivityFeed
					groups={groups}
					targetCurrency={targetCurrency}
					convert={convert}
					format={formatCurrency}
				/>
			</RecentActivityFx>
		</FinanceCard>
	);
};

RecentActivityPanel.displayName = 'RecentActivityPanel';

export { RecentActivityPanel };
