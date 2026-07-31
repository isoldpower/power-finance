import { ActivityGroupHeader, ActivityRow, AmountDirectionIcon, toneByDirection, toTransactionDayView } from "@entity/transactions";
import { useConvertMoney } from "@feature/localization";
import { ProtectActivityEmpty } from "@feature/transactions";
import { useLocaleCurrency } from "@shared/utils";

import { useMemo } from "react";

import type { FC } from "react";
import type { RecentActivityGroup } from "@feature/transactions";


interface ActivityFeedProps {
	groups: RecentActivityGroup[];
}

const ActivityFeed: FC<ActivityFeedProps> = ({ groups }) => {
	const { convert, targetCurrency } = useConvertMoney();
	const formatCurrency = useLocaleCurrency();

	const days = useMemo(() => groups.map((group) => (
		toTransactionDayView(group.dayKey, group.transactions, convert, formatCurrency)
	)), [groups, convert, formatCurrency]);

	return (
		<ProtectActivityEmpty activityGroups={days}>
			{days.map((day) => (
				<div key={day.dayLabel}>
					<ActivityGroupHeader.Container>
						<ActivityGroupHeader.Label>
							{day.dayLabel}
						</ActivityGroupHeader.Label>
						<ActivityGroupHeader.Money positive={day.dayTotal >= 0}>
							{formatCurrency(day.dayTotal, targetCurrency)}
						</ActivityGroupHeader.Money>
					</ActivityGroupHeader.Container>
					{day.transactions.map((transaction) => (
						<ActivityRow.Container key={transaction.id}>
							<ActivityRow.Icon tone={transaction.direction === 'in' ? 'positive' : 'negative'}>
								<AmountDirectionIcon direction={transaction.direction} />
							</ActivityRow.Icon>
							<div className="min-w-0 flex-1">
								<ActivityRow.Title>
									{transaction.walletName}
								</ActivityRow.Title>
								<ActivityRow.Body>
									<span>{transaction.category}</span>
									<ActivityRow.Separator />
									<span>{transaction.time}</span>
								</ActivityRow.Body>
							</div>
							<div className="text-right">
								<ActivityRow.Money
									tone={toneByDirection[transaction.direction]}
									currency={transaction.currency}
									convert={convert}
									format={formatCurrency}
								>
									{transaction.amount}
								</ActivityRow.Money>
								<ActivityRow.Date>
									{transaction.date}
								</ActivityRow.Date>
							</div>
						</ActivityRow.Container>
					))}
				</div>
			))}
		</ProtectActivityEmpty>
	);
};

ActivityFeed.displayName = 'ActivityFeed';

export { ActivityFeed };
export type { ActivityFeedProps };
