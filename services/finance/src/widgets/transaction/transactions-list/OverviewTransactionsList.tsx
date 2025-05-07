import { cloneElement } from "react";
import type { FC, ReactElement } from "react";

import {
	TransactionsListFx,
	useTransactionsList,
	filterRelatedTransactions,
	getMonthGroupedTransactions
} from "@feature/transaction";
import {
	TransactionsList,
	TransactionsListError,
	TransactionsListPending
} from "@entity/transaction";
import { useLocaleDateTransform } from "@shared/utils";
import type { Transaction } from "@entity/transaction";


interface OverviewTransactionsListProps {
	children: ReactElement<{
		transaction: Transaction,
		selectedWallet?: string | undefined
	}>;
	selectedWallet?: string | undefined;
}

const OverviewTransactionsList: FC<OverviewTransactionsListProps> = ({
	children,
	selectedWallet
}) => {
	const { status, transactions } = useTransactionsList();
	const transform = useLocaleDateTransform();
	const selectedTransactions = getMonthGroupedTransactions(
		filterRelatedTransactions(
			selectedWallet === 'all' ? undefined : selectedWallet,
			transactions
		)
	);

	return Object.entries(selectedTransactions).length > 0 || status === 'pending'
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
								{related?.map((transaction) => (
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
			<div className="text-center py-10 border border-dashed rounded-lg">
				<p className="text-gray-500">
					No transactions found
				</p>
				<p className="text-sm text-gray-400 mt-1">
					It seems that this wallet doesn't have transactions</p>
			</div>
		);
};

OverviewTransactionsList.displayName = 'OverviewTransactionsList';

export { OverviewTransactionsList };
export type { OverviewTransactionsListProps };