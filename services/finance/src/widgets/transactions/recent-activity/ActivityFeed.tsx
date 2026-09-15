import { isNegativeAmount } from "@shared/api";
import { useMemo } from "react";
import {
	ActivityGroupHeader,
	ActivityRow,
	AmountDirectionIcon,
	resolveToneWithDirection,
	toChainBound,
	toTransactionDayView,
	TransactionChainBadge,
} from "@entity/transactions";
import { useConvertMoney } from "@feature/localization";
import { LadderAppearance, ProtectActivityEmpty } from "@feature/transactions";
import { useLocaleCurrency } from "@shared/formatting";
import { MetaText, Overline, RowTitle } from "@shared/pure-components/typography";

import type { FC } from "react";
import type { RecentActivityGroup } from "@feature/transactions";


interface ActivityFeedProps {
	groups: RecentActivityGroup[];
}

const ActivityFeed: FC<ActivityFeedProps> = ({ groups }) => {
	const { convert, targetCurrency } = useConvertMoney();
	const formatCurrency = useLocaleCurrency();

	const dailyGroups = useMemo(() => {
		let position = 0;

		return groups.map((group) => {
			const day = toTransactionDayView(group.dayKey, group.transactions, convert);
			const startPosition = position;
			position += day.transactions.length;

			return { ...day, startPosition, entries: toChainBound(day.transactions) };
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
					{day.entries.map((entry, index) => (
						<LadderAppearance order={day.startPosition + index} key={entry.item.id}>
							<ActivityRow position={entry.position} pending={entry.item.pending}>
								<ActivityRow.Icon tone={entry.item.type === 'income' ? 'positive' : 'negative'}>
									<AmountDirectionIcon type={entry.item.type} />
								</ActivityRow.Icon>
								<div className="min-w-0 flex-1">
									<div className="flex items-center gap-1.5">
										<RowTitle>
											{entry.item.description}
										</RowTitle>
										{entry.index === 0 && entry.position !== 'single'
											? <TransactionChainBadge size={entry.chain?.size ?? null} />
											: null}
									</div>
									<ActivityRow.Body>
										<span>{entry.item.walletName}</span>
										<ActivityRow.Separator />
										<span>{entry.item.category}</span>
									</ActivityRow.Body>
								</div>
								<div className="text-right">
									<ActivityRow.Money
										tone={resolveToneWithDirection(
											entry.item.type
										)}
										amount={formatCurrency(
											entry.item.amount,
											entry.item.currency
										)}
										converted={convert({
											amount: entry.item.amount,
											currency: entry.item.currency,
										}).formatted}
									/>
									<MetaText as="time" size="10.5" dateTime={entry.item.createdAt} className="block">
										{entry.item.time}
									</MetaText>
								</div>
							</ActivityRow>
						</LadderAppearance>
					))}
				</div>
			))}
		</ProtectActivityEmpty>
	);
};

ActivityFeed.displayName = 'ActivityFeed';

export { ActivityFeed };
export type { ActivityFeedProps };
