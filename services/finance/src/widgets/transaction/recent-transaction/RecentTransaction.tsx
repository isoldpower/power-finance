import type { FC } from "react";

import {
	TransactionTargets,
	TransactionTypeIcon,
	TransactionValue
} from "@entity/transaction";
import type { Transaction } from "@entity/transaction";


interface RecentTransactionProps {
	transaction: Transaction | null;
}

const RecentTransaction: FC<RecentTransactionProps> = ({
	transaction: passedTransaction
}) => {
	if (!passedTransaction) return null;

	return (
		<div
			key={passedTransaction.id}
			className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
		>
			<div className="flex items-center">
				<TransactionTypeIcon type={passedTransaction.type} />
				<div className="ml-3 flex-grow">
					<p className="text-sm font-medium text-gray-900">
						{passedTransaction.description || 'Some category'}
					</p>
					<TransactionTargets
						to={passedTransaction.to && { amount: passedTransaction.amount, currency: 'USD', target: passedTransaction.to }}
						from={passedTransaction.from && { amount: passedTransaction.amount, currency: 'RUB', target: passedTransaction.from }} />
				</div>
				<TransactionValue amount={
					passedTransaction.from?.id === passedTransaction.id
						? -passedTransaction.amount
						: passedTransaction.amount
				} />
			</div>
		</div>
		// <TransactionPaper>
		// 	<div className="flex items-center gap-10 grow">
		// 		<TransactionTypeIcon type={passedTransaction.type} />
		// 		<div className="flex grow justify-between">
		// 			<TransactionTargets
		// 				to={passedTransaction.type === 'income' || passedTransaction.type === 'adjust' || passedTransaction.type === 'transfer'
		// 					? { amount: passedTransaction.amount, currency: 'USD', target: passedTransaction.to }
		// 					: undefined}
		// 				from={passedTransaction.type === 'expense' || passedTransaction.type === 'transfer'
		// 					? { amount: passedTransaction.amount, currency: 'RUB', target: passedTransaction.from }
		// 					: undefined}
		// 			/>
		// 		</div>
		// 		{passedTransaction.type && (
		// 			<TransactionSince
		// 				date={passedTransaction.createdAt} />
		// 		)}
		// 	</div>
		// </TransactionPaper>
	);
}

export { RecentTransaction };