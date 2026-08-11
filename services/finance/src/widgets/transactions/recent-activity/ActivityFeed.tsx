import { ActivityGroupHeader, ActivityRow, AmountDirectionIcon, resolveToneWithDirection, toTransactionDayView } from "@entity/transactions";
import { useConvertMoney } from "@feature/localization";
import { ProtectActivityEmpty } from "@feature/transactions";
import { useLocaleCurrency } from "@shared/formatting";
import { MetaText, Overline, RowTitle } from "@shared/pure-components/typography";

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
						<Overline as="span" size="10" tracking="0.1em">
							{day.dayLabel}
						</Overline>
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
								<RowTitle>
									{transaction.description}
								</RowTitle>
								<ActivityRow.Body>
									<span>{transaction.walletName}</span>
									<ActivityRow.Separator />
									<span>{transaction.category}</span>
								</ActivityRow.Body>
							</div>
							<div className="text-right">
								<ActivityRow.Money
									tone={resolveToneWithDirection(transaction.direction)}
									currency={transaction.currency}
									convert={convert}
									format={formatCurrency}
								>
									{transaction.amount}
								</ActivityRow.Money>
								<MetaText size="10.5" dateTime={transaction.createdAt}>
									{transaction.time}
								</MetaText>
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
