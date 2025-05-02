import { cloneElement } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@internal/ui-library";
import { getFinanceRoute } from "@internal/shared";
import type { FC, ReactElement } from "react";

import { getRecentTransactions, TransactionsListFx, useTransactionsList } from "@feature/transaction";
import { TransactionsList, TransactionsListError, TransactionsListPending } from "@entity/transaction";
import type { Transaction } from "@entity/transaction";
import type { Wallet } from "@entity/wallet";


type RecentTransactionsListProps = {
	children: ReactElement<{
		transaction: Transaction,
		source: Wallet | null
	}>;
	selectedWallet?: Wallet | null;
}

const RecentTransactionsList: FC<RecentTransactionsListProps> = ({
	children,
	selectedWallet
}) => {
	const { status, transactions } = useTransactionsList();

	return transactions.length > 0 || status === 'pending'
		? (
			<TransactionsListFx
				pending={<TransactionsListPending amount={3} /> }
				error={<TransactionsListError amount={3} /> }
				status={status}
			>
				<TransactionsList>
					{getRecentTransactions(transactions)
						.filter((transaction) => {
							const displayAll = !selectedWallet;
							const isSource = transaction.from?.id === selectedWallet?.id;
							const isDestination = transaction.to?.id === selectedWallet?.id;

							return displayAll || isSource || isDestination;
						})
						.map((transaction) => (
							cloneElement(children, {
								transaction,
								source: selectedWallet,
								key: transaction.id
							})
					))}
				</TransactionsList>
			</TransactionsListFx>
		)
		: (
			<div className="col-span-3 text-center py-10 border border-dashed rounded-lg">
				<p className="text-gray-500">No wallets found</p>
				<Button variant="link" asChild>
					<Link to={getFinanceRoute('wallets')}>
						Add your first wallet
					</Link>
				</Button>
			</div>
		)
}

RecentTransactionsList.displayName = 'RecentTransactionsList';

export { RecentTransactionsList };
export type { RecentTransactionsListProps };