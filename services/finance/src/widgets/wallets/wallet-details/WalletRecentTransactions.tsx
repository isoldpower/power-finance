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
		() => toTransactionRowViews(recentTransactions, format),
		[recentTransactions, format]
	);

	return (
		<div className='flex flex-col'>
			{recentRows.map((row) => (
				<RecentTransactionContainer key={row.id}>
					<WalletTransactionIcon tone={resolveToneWithDirection(row.direction)}>
						<AmountDirectionIcon direction={row.direction} />
					</WalletTransactionIcon>
					<RecentTransactionMeta
						description={row.description}
						category={row.category}
						date={row.date}
					/>
					<MoneyInOriginal
						currency={row.currency}
						tone={resolveToneWithDirection(row.direction)}
						size="sm"
						align="end"
						convert={convert}
						format={format}
					>
						{row.amount}
					</MoneyInOriginal>
				</RecentTransactionContainer>
			))}
			<FulfillWithPlaceholder current={recentRows.length} minimum={3}>
				<NoActivityPlaceholder.Container>
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
				</NoActivityPlaceholder.Container>
			</FulfillWithPlaceholder>
		</div>
	);
};

WalletRecentTransactions.displayName = 'WalletRecentRow';

export { WalletRecentTransactions };
export type { WalletRecentRowProps };
