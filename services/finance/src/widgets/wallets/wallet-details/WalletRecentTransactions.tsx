import { useMemo } from "react";

import { MoneyInOriginal } from "@entity/localization";
import {
	AmountDirectionIcon,
	resolveToneWithDirection,
	toTransactionRowViews,
} from "@entity/transactions";
import {
	NoActivityPlaceholder,
	RecentTransactionMeta,
	RecentTransactionContainer,
	WalletTransactionIcon
} from "@entity/wallets";
import { useConvertMoney } from "@feature/localization";
import { useWalletRecentTransactions, FulfillWithPlaceholder } from "@feature/wallets";
import { useLocaleCurrency } from "@shared/formatting";
import { Caption } from "@shared/pure-components/typography";

import type { FC } from "react";
import type { Wallet } from "@entity/wallets";


interface WalletRecentRowProps {
	wallet: Wallet;
}

const WalletRecentTransactions: FC<WalletRecentRowProps> = ({ wallet }) => {
	const { convert } = useConvertMoney();
	const format = useLocaleCurrency();
	const recentTransactions = useWalletRecentTransactions(wallet);

	const recentRows = useMemo(
		() => toTransactionRowViews(recentTransactions),
		[recentTransactions]
	);

	return (
		<div className='flex flex-col'>
			{recentRows.map((row) => (
				<RecentTransactionContainer key={row.id}>
					<WalletTransactionIcon tone={resolveToneWithDirection(row.type)}>
						<AmountDirectionIcon type={row.type} />
					</WalletTransactionIcon>
					<RecentTransactionMeta
						description={row.description}
						category={row.category}
						date={row.date}
					/>
					<MoneyInOriginal align="end">
						<MoneyInOriginal.Amount tone={resolveToneWithDirection(row.type)} size="sm">
							{format(row.amount, row.currency)}
						</MoneyInOriginal.Amount>
						<MoneyInOriginal.Converted>
							{convert({ amount: row.amount, currency: row.currency }).formatted}
						</MoneyInOriginal.Converted>
					</MoneyInOriginal>
				</RecentTransactionContainer>
			))}
			<FulfillWithPlaceholder current={recentRows.length} minimum={3}>
				<NoActivityPlaceholder>
					<NoActivityPlaceholder.Border />
					<div className="min-w-0 flex-1 relative">
						<NoActivityPlaceholder.Original>
							&nbsp;
						</NoActivityPlaceholder.Original>
						<Caption size="11">
							&nbsp;
						</Caption>
						<NoActivityPlaceholder.Title>
							No activity yet
						</NoActivityPlaceholder.Title>
					</div>
				</NoActivityPlaceholder>
			</FulfillWithPlaceholder>
		</div>
	);
};

WalletRecentTransactions.displayName = 'WalletRecentRow';

export { WalletRecentTransactions };
export type { WalletRecentRowProps };
