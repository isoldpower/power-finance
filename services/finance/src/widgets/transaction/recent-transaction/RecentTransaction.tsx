import { useMemo } from "react";
import type { FC } from "react";

import {
	TransactionPaper,
	TransactionTargets,
	TransactionTypeIcon,
	TransactionValue
} from "@entity/transaction";
import { useTransaction } from "@feature/transaction";
import type { TransactionPreviewDto } from "@entity/transaction";


interface RecentTransactionProps {
	transaction: TransactionPreviewDto;
	selectedWallet?: string | undefined;
}

const RecentTransaction: FC<RecentTransactionProps> = ({
	transaction: passedTransaction,
	selectedWallet
}) => {
	const { transaction: detailedTransaction, isLoading } = useTransaction(passedTransaction.id);
	
	const perspective = useMemo(() => {
		return !selectedWallet
			? passedTransaction.type === 'transfer'
				? 'neutral'
				: passedTransaction.type === 'income'
					? 'income'
					: 'outcome'
			: passedTransaction.sender?.wallet_id === selectedWallet
				? 'outcome'
				: 'income';
	}, [passedTransaction, selectedWallet]);

	const transactionSide = useMemo(() => {
		return detailedTransaction ? (!selectedWallet
			? detailedTransaction.sender ?? detailedTransaction.receiver
			: selectedWallet === detailedTransaction.sender?.wallet.id
				? detailedTransaction.sender
				: detailedTransaction.receiver ?? undefined) : undefined
	}, [detailedTransaction, selectedWallet]);

	return (
		<TransactionPaper>
			<div className="flex items-center">
				<TransactionTypeIcon type={passedTransaction.type} />
				<div className="ml-3 flex-grow">
					<p className="text-sm font-medium">
						{passedTransaction.description?.length && passedTransaction.description.length > 0 
							? passedTransaction.description
							: 'Some category'
						}
					</p>
					{(!isLoading && detailedTransaction) ? (
						<TransactionTargets
							to={detailedTransaction.receiver && {
								target: detailedTransaction.receiver.wallet
							}}
							from={detailedTransaction.sender && {
								target: detailedTransaction.sender.wallet
							}} />
					) : null}
				</div>
				{transactionSide && (
					<TransactionValue
						perspective={perspective}
						side={{
							...transactionSide, 
							amount: transactionSide.amount * (transactionSide.wallet.credit ? -1 : 1) 
					    }}
					/>
				)}
			</div>
		</TransactionPaper>
	);
}

export { RecentTransaction };