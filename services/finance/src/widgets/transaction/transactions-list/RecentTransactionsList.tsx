import { cloneElement } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@internal/ui-library";
import { getFinanceRoute } from "@internal/shared";
import type { FC, ReactElement } from "react";

import { getRecentTransactions, TransactionsListFx, useTransactionsList } from "@feature/transaction";
import { TransactionsList, TransactionsListError, TransactionsListPending } from "@entity/transaction";
import type { Transaction } from "@entity/transaction";


type RecentTransactionsListProps = {
	children: ReactElement<{ transaction: Transaction }>;
}

const RecentTransactionsList: FC<RecentTransactionsListProps> = ({ children }) => {
	const { status, transactions } = useTransactionsList();

	return transactions.length > 0 || status === 'pending'
		? (
			<TransactionsListFx
				pending={<TransactionsListPending amount={3} /> }
				error={<TransactionsListError amount={3} /> }
				status={status}
			>
				<TransactionsList>
					{getRecentTransactions(transactions).map((transaction) => (
						cloneElement(children, {
							transaction,
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