import { cloneElement } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@internal/ui-library";
import { getFinanceRoute } from "@internal/shared";
import type { FC, ReactElement } from "react";

import {
	getRecentTransactions,
	TransactionsListFx,
	useTransactionsList,
	filterRelatedTransactions,
	getMonthGroupedTransactions
} from "@feature/transaction";
import { TransactionsList, TransactionsListError, TransactionsListPending } from "@entity/transaction";
import { useLocaleDateTransform } from "@shared/utils";
import type { Transaction } from "@entity/transaction";


type RecentTransactionsListProps = {
	children: ReactElement<{
		transaction: Transaction,
		selectedWallet?: string | undefined
	}>;
	selectedWallet?: string | undefined;
}

const RecentTransactionsList: FC<RecentTransactionsListProps> = ({
	children,
	selectedWallet
}) => {
	const { status, transactions } = useTransactionsList();
	const transform = useLocaleDateTransform();
	const selectedTransactions = getMonthGroupedTransactions(
		filterRelatedTransactions(
			selectedWallet,
			getRecentTransactions(transactions)
		)
	);

	return transactions.length > 0 || status === 'pending'
		? (
			<TransactionsListFx
				pending={<TransactionsListPending amount={3} /> }
				error={<TransactionsListError amount={3} /> }
				status={status}
			>
				<TransactionsList>
					{Object.entries(selectedTransactions).map(([date, related]) => (
						<div key={date} className="space-y-2">
							<h3 className="text-sm font-medium text-gray-500">
								{transform(date)}
							</h3>
							<div className="bg-white rounded-lg overflow-hidden border border-gray-200">
								{related.map((transaction) => (
									<div key={transaction.id} className="border-b last:border-b-0">
										{cloneElement(children, {
											transaction,
											selectedWallet,
											key: transaction.id
										})}
									</div>
								))}
							</div>
						</div>
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