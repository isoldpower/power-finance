import { ActivityRow, AmountDirectionIcon, resolveToneWithDirection, TransactionChainBadge } from "@entity/transactions";
import { LadderAppearance } from "@feature/transactions";
import { useConvertMoney } from "@feature/localization";
import { useLocaleCurrency } from "@shared/formatting";
import { MetaText, RowTitle } from "@shared/pure-components/typography";

import type { TransactionRowView, ChainBound } from "@entity/transactions";
import type { FC } from "react";


interface DayOfActivityFeedProps {
	entry: ChainBound<TransactionRowView>;
	order: number;
}

const DayOfActivityFeed: FC<DayOfActivityFeedProps> = ({ 
	entry,
	order
}) => {
	const { convert } = useConvertMoney();
	const formatCurrency = useLocaleCurrency();
	
	return (
		<LadderAppearance order={order} key={entry.item.id}>
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
	);
}

DayOfActivityFeed.displayName = "DayOfActivityFeed";

export { DayOfActivityFeed };
