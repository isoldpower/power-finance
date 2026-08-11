import { cn, FinanceCard } from "@internal/ui-library";
import { ActivityFeed } from "@widget/transactions";
import { useRecentActivity, RecentActivityFx } from "@feature/transactions";
import { ActivityFeedHeader, ActivityFeedSkeleton } from "@entity/transactions";
import { CardTitle } from "@shared/pure-components/typography";

import type { FC } from "react";


interface RecentActivityPanelProps {
	className?: string;
}

const RecentActivityPanel: FC<RecentActivityPanelProps> = ({ className }) => {
	const { groups, isPending } = useRecentActivity();

	return (
		<FinanceCard className={cn("overflow-hidden", className)}>
			<ActivityFeedHeader.Container>
				<CardTitle as="h2">
					Recent activity
				</CardTitle>
				<ActivityFeedHeader.Link to="management">
					View all in Management →
				</ActivityFeedHeader.Link>
			</ActivityFeedHeader.Container>
			<RecentActivityFx isPending={isPending} pending={<ActivityFeedSkeleton />}>
				<ActivityFeed groups={groups} />
			</RecentActivityFx>
		</FinanceCard>
	);
};

RecentActivityPanel.displayName = 'RecentActivityPanel';

export { RecentActivityPanel };
