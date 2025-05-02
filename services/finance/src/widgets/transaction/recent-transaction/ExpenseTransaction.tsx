import { useSettingsContext } from "@internal/shared";
import type { FC } from "react";

import { TransactionTypeIcon } from "@entity/transaction/type-card/TransactionTypeIcon";
import { TransactionTargets } from "@entity/transaction/type-card/TransactionTargets.tsx";
import { TransactionAmount } from "@entity/transaction/type-card/TransactionAmount.tsx";
import type { Transaction } from "@entity/transaction";
import {TransactionPaper} from "@entity/transaction/type-card/TransactionPaper.tsx";


interface ExpenseTransactionProps {
	transaction: Transaction;
}

const ExpenseTransaction: FC<ExpenseTransactionProps> = ({ transaction }) => {
	const { locale } = useSettingsContext();

	if (!transaction || transaction.type !== 'expense') return;

	return (
		<TransactionPaper>
			<div className="flex items-center gap-4">
				 <TransactionTypeIcon type={transaction.type} />
				 <TransactionTargets
					 from={{ amount: transaction.amount, currency: 'RUB', target: transaction.from }} />
			</div>
			 <TransactionAmount amount={transaction.amount} locale={locale} />
		</TransactionPaper>
	);
};

ExpenseTransaction.displayName = 'ExpenseTransaction';

export { ExpenseTransaction };
export type { ExpenseTransactionProps };