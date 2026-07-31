import {useMemo} from "react";

import {MoneyInOriginal} from "@entity/localization";
import {AmountDirectionIcon, directionIconClass, toneByDirection, toTransactionRowViews} from "@entity/transactions";
import {Wallet, WalletTransactionIcon} from "@entity/wallets";
import {useConvertMoney} from "@feature/localization";
import {useLocaleCurrency} from "@shared/utils";
import {useWalletRecentTransactions} from "@feature/wallets/wallet-browser/use-wallet-recent-transactions.ts";
import {NoActivityPlaceholder} from "@entity/wallets/wallet-details/NoActivityPlaceholder.tsx";
import {RecentTransactionContainer} from "@entity/wallets/wallet-details/RecentTransactionContainer.tsx";
import {RecentTransactionMeta} from "@entity/wallets/wallet-details/RecentTransactionMeta.tsx";
import {FulfillWithPlaceholder} from "@feature/wallets/wallet-browser/FulfillWithPlaceholder.tsx";

import type {FC} from "react";


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
					<WalletTransactionIcon className={directionIconClass[row.direction]}>
						<AmountDirectionIcon direction={row.direction} />
					</WalletTransactionIcon>
					<RecentTransactionMeta
						category={row.category}
						date={row.date}
						time={row.time}
					/>
					<MoneyInOriginal
						currency={row.currency}
						tone={toneByDirection[row.direction]}
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
				<NoActivityPlaceholder />
			</FulfillWithPlaceholder>
		</div>
	);
};

WalletRecentTransactions.displayName = 'WalletRecentRow';

export { WalletRecentTransactions };
export type { WalletRecentRowProps };
