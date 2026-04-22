import type { FC } from "react";

import {
	TransactionPaper,
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
}) => {
	const { transaction: detailedTransaction, isLoading } = useTransaction(passedTransaction.id);

	return (
		<TransactionPaper>
			<div className="flex items-center">
				<div className="w-8 h-8 p-2 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center" />
				<div className="ml-3 flex-grow">
					<p className="text-sm font-medium">
						{passedTransaction.currency_code}
					</p>
					{(!isLoading && detailedTransaction) ? (
						<p className="text-xs text-gray-500">{detailedTransaction.source_wallet.name}</p>
					) : null}
				</div>
				{!isLoading && detailedTransaction && (
					<TransactionValue
						amount={detailedTransaction.amount}
						currencyCode={detailedTransaction.currency_code}
					/>
				)}
			</div>
		</TransactionPaper>
	);
}

export { RecentTransaction };
