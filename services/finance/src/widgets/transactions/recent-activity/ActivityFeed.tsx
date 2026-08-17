import {
	ActivityGroupHeader,
	ActivityRow,
	AmountDirectionIcon,
	resolveToneWithDirection,
	toTransactionDayView,
} from "@entity/transactions";
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

const APPEAR_STEP_MS = 45;
const APPEAR_CAP_MS = 450;

const toAppearDelay = (position: number): number => Math.min(position * APPEAR_STEP_MS, APPEAR_CAP_MS);

const ActivityFeed: FC<ActivityFeedProps> = ({ groups }) => {
	const { convert, targetCurrency } = useConvertMoney();
	const formatCurrency = useLocaleCurrency();

	const days = useMemo(() => {
		let position = 0;

		return groups.map((group) => {
			const day = toTransactionDayView(group.dayKey, group.transactions, convert);
			const startPosition = position;
			position += day.transactions.length;

			return { ...day, startPosition };
		});
	}, [groups, convert]);

	return (
		<ProtectActivityEmpty activityGroups={days}>
			{days.map((day) => (
				<div key={day.dayLabel}>
					<ActivityGroupHeader>
						<Overline as="span" size="10" tracking="0.1em">
							{day.dayLabel}
						</Overline>
						<ActivityGroupHeader.Money positive={day.dayTotal >= 0}>
							{formatCurrency(day.dayTotal, targetCurrency)}
						</ActivityGroupHeader.Money>
					</ActivityGroupHeader>
					{day.transactions.map((transaction, index) => (
						<ActivityRow
							key={transaction.id}
							appearDelayMs={toAppearDelay(day.startPosition + index)}
						>
							<ActivityRow.Icon tone={transaction.type === 'income' ? 'positive' : 'negative'}>
								<AmountDirectionIcon type={transaction.type} />
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
									tone={resolveToneWithDirection(transaction.type)}
									amount={formatCurrency(transaction.amount, transaction.currency)}
									converted={convert({
										amount: transaction.amount,
										currency: transaction.currency,
									}).formatted}
								/>
								<MetaText size="10.5" dateTime={transaction.createdAt}>
									{transaction.time}
								</MetaText>
							</div>
						</ActivityRow>
					))}
				</div>
			))}
		</ProtectActivityEmpty>
	);
};

ActivityFeed.displayName = 'ActivityFeed';

export { ActivityFeed };
export type { ActivityFeedProps };
