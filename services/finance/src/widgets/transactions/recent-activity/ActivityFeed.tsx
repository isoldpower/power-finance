import { isNegativeAmount } from "@shared/api";
import { useMemo, Fragment } from "react";
import { ActivityGroupHeader, toChainBound, toTransactionDayView } from "@entity/transactions";
import { useConvertMoney } from "@feature/localization";
import { ProtectActivityEmpty } from "@feature/transactions";
import { useLocaleCurrency } from "@shared/formatting";
import { Overline } from "@shared/pure-components/typography";

import type { ChainBound, TransactionRowView } from "@entity/transactions";
import type { FC, ReactNode } from "react";
import type { RecentActivityGroup } from "@feature/transactions";
import type { DayOfActivityData } from "./types.ts";


interface ActivityFeedProps {
	groups: RecentActivityGroup[];
	children: (
		entry: ChainBound<TransactionRowView>,
		order: number,
	) => ReactNode;
}

const ActivityFeed: FC<ActivityFeedProps> = ({ 
	groups,
	children,
}) => {
	const { convert, targetCurrency } = useConvertMoney();
	const formatCurrency = useLocaleCurrency();

	const dailyGroups = useMemo(() => {
		let position = 0;

		return groups.map((group): DayOfActivityData => {
			const day = toTransactionDayView(
				group.dayKey,
				group.transactions,
				convert,
			);
			const startPosition = position;
			position += day.transactions.length;

			return { 
				...day,
				startPosition,
				entries: toChainBound(day.transactions),
			};
		});
	}, [groups, convert]);

	return (
		<ProtectActivityEmpty activityGroups={dailyGroups}>
			{dailyGroups.map((day) => (
				<div key={day.dayLabel}>
					<ActivityGroupHeader>
						<Overline as="span" size="10" tracking="0.1em">
							{day.dayLabel}
						</Overline>
						<ActivityGroupHeader.Money positive={!isNegativeAmount(day.dayTotal)}>
							{formatCurrency(day.dayTotal, targetCurrency)}
						</ActivityGroupHeader.Money>
					</ActivityGroupHeader>
					{day.entries.map((entry, index) => {
						return (
							<Fragment key={entry.index}>
								{children(entry, day.startPosition + index)}
							</Fragment>
						);
					})}
				</div>
			))}
		</ProtectActivityEmpty>
	);
};

ActivityFeed.displayName = 'ActivityFeed';

export { ActivityFeed };
export type { ActivityFeedProps };
