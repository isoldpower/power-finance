import type { FC } from "react";

import {
	TransactionPaper,
	TransactionTypeIcon,
	TransactionTargets,
	TransactionSince
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
		<TransactionPaper>
			<div className="flex items-center gap-10 grow">
				<TransactionTypeIcon type={passedTransaction.type} />
				<div className="flex grow justify-between">
					<TransactionTargets
						to={passedTransaction.type === 'income' || passedTransaction.type === 'adjust' || passedTransaction.type === 'transfer'
							? { amount: passedTransaction.amount, currency: 'USD', target: passedTransaction.to }
							: undefined}
						from={passedTransaction.type === 'expense' || passedTransaction.type === 'transfer'
							? { amount: passedTransaction.amount, currency: 'RUB', target: passedTransaction.from }
							: undefined}
					/>
				</div>
				{passedTransaction.type && (
					<TransactionSince
						date={passedTransaction.createdAt} />
				)}
			</div>
		</TransactionPaper>
	);
}

export { RecentTransaction };