import { useSettingsContext } from "@internal/shared";
import type { FC } from "react";

import { TransactionTypeIcon } from "@entity/transaction/type-card/TransactionTypeIcon";
import { TransactionTargets } from "@entity/transaction/type-card/TransactionTargets.tsx";
import { TransactionAmount } from "@entity/transaction/type-card/TransactionAmount.tsx";
import type { Transaction } from "@entity/transaction";
import { TransactionPaper } from "@entity/transaction/type-card/TransactionPaper.tsx";


interface TransferTransactionProps {
	transaction: Transaction;
}

const TransferTransaction: FC<TransferTransactionProps> = ({ transaction }) => {
	const { locale } = useSettingsContext();

	if (!transaction || transaction.type !== 'transfer') return;

	return (
		<TransactionPaper>
			<div className="flex items-center gap-4">
				 <TransactionTypeIcon type={transaction.type} />
				 <TransactionTargets
					 from={{ amount: transaction.amount, currency: 'RUB', target: transaction.from }}
					 to={{ amount: transaction.amount, currency: 'USD', target: transaction.to }} />
			</div>
			 <TransactionAmount amount={transaction.amount} locale={locale} />
		</TransactionPaper>
	);
};

TransferTransaction.displayName = 'TransferTransaction';

export { TransferTransaction };
export type { TransferTransactionProps };