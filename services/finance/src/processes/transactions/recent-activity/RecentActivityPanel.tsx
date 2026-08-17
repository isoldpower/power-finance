import { cn, FinanceCard } from "@internal/ui-library";
import { ActivityFeed } from "@widget/transactions";
import { useRecentActivity, RecentActivityFx } from "@feature/transactions";
import { ActivityFeedHeader, ActivityFeedSkeleton } from "@entity/transactions";
import { CardTitle } from "@shared/pure-components/typography";

import type { FC } from "react";


const PLACEHOLDER_DAYS = [
	{ key: 'd1', rows: ['d1r1', 'd1r2', 'd1r3', 'd1r4'] },
	{ key: 'd2', rows: ['d2r1', 'd2r2', 'd2r3', 'd2r4'] },
];

interface RecentActivityPanelProps {
	className?: string;
}

const RecentActivityPanel: FC<RecentActivityPanelProps> = ({ className }) => {
	const { groups, isPending } = useRecentActivity();

	return (
		<FinanceCard className={cn("overflow-hidden", className)}>
			<ActivityFeedHeader>
				<CardTitle as="h2">
					Recent activity
				</CardTitle>
				<ActivityFeedHeader.Link to="management">
					View all in Management →
				</ActivityFeedHeader.Link>
			</ActivityFeedHeader>
			<RecentActivityFx isPending={isPending} pending={<RecentActivitySkeleton />}>
				<ActivityFeed groups={groups} />
			</RecentActivityFx>
		</FinanceCard>
	);
};

const RecentActivitySkeleton: FC = () => (
	<ActivityFeedSkeleton>
		{PLACEHOLDER_DAYS.map((day) => (
			<ActivityFeedSkeleton.Day key={day.key}>
				<ActivityFeedSkeleton.GroupHeader />
				{day.rows.map((row) => (
					<ActivityFeedSkeleton.Row key={row} />
				))}
			</ActivityFeedSkeleton.Day>
		))}
	</ActivityFeedSkeleton>
);

RecentActivitySkeleton.displayName = 'RecentActivitySkeleton';

RecentActivityPanel.displayName = 'RecentActivityPanel';

export { RecentActivityPanel };
