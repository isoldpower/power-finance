import { useMemo } from "react";
import type { FC } from "react";

import {
	TransactionPaper,
	TransactionTargets,
	TransactionTypeIcon,
	TransactionValue
} from "@entity/transaction";
import type { Transaction } from "@entity/transaction";


interface RecentTransactionProps {
	transaction: Transaction | null;
	selectedWallet?: string | undefined;
}

const RecentTransaction: FC<RecentTransactionProps> = ({
	transaction: passedTransaction,
	selectedWallet
}) => {
	if (!passedTransaction) return null;

	const perspective = useMemo(() => {
		return !selectedWallet
			? passedTransaction.type === 'transfer'
				? 'neutral'
				: passedTransaction.type === 'income'
					? 'income'
					: 'outcome'
			: passedTransaction.from?.wallet?.id === selectedWallet
				? 'outcome'
				: 'income';
	}, [passedTransaction, selectedWallet]);

	const transactionSide = useMemo(() => {
		return (!selectedWallet
			? passedTransaction.from ?? passedTransaction.to
			: selectedWallet === passedTransaction.from?.wallet?.id
				? passedTransaction.from
				: passedTransaction.to) ?? undefined
	}, [passedTransaction, selectedWallet]);

	return (
		<TransactionPaper>
			<div className="flex items-center">
				<TransactionTypeIcon type={passedTransaction.type} />
				<div className="ml-3 flex-grow">
					<p className="text-sm font-medium text-gray-900">
						{passedTransaction.description || 'Some category'}
					</p>
					<TransactionTargets
						to={passedTransaction.to && {
							target: passedTransaction.to.wallet
						}}
						from={passedTransaction.from && {
							target: passedTransaction.from.wallet
						}} />
				</div>
				<TransactionValue
					perspective={perspective}
					side={transactionSide} />
			</div>
		</TransactionPaper>
	);
}

export { RecentTransaction };