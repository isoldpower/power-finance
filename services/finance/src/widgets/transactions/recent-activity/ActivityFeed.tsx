import type { FC } from "react";

import { ActivityDayHeader, ActivityRow } from "@entity/transactions";
import type { ActivityRowData } from "@entity/transactions";


interface ActivityGroup {
	label: string;
	sum: number;
	rows: ActivityRowData[];
}

interface ActivityFeedProps {
	groups: ActivityGroup[];
	targetCurrency: string;
	convert: (money: { amount: number; currency: string }) => { formatted: string; converted: boolean };
	format: (amount: number, currency: string) => string;
}

const ActivityFeed: FC<ActivityFeedProps> = ({ groups, targetCurrency, convert, format }) => {
	if (groups.length === 0) {
		return (
			<div className="px-[18px] py-8 text-center text-[13px] text-text-3">
				No recent activity.
			</div>
		);
	}

	return (
		<>
			{groups.map((group) => (
				<div key={group.label}>
					<ActivityDayHeader
						label={group.label}
						sumFormatted={format(group.sum, targetCurrency)}
						positive={group.sum >= 0}
					/>
					{group.rows.map((row) => (
						<ActivityRow key={row.id} row={row} convert={convert} format={format} />
					))}
				</div>
			))}
		</>
	);
};

ActivityFeed.displayName = 'ActivityFeed';

export { ActivityFeed };
export type { ActivityFeedProps, ActivityGroup };
