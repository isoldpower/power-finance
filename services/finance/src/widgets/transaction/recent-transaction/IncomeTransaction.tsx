import { useSettingsContext } from "@internal/shared";
import type { FC } from "react";

import { TransactionTypeIcon } from "@entity/transaction/type-card/TransactionTypeIcon";
import { TransactionTargets } from "@entity/transaction/type-card/TransactionTargets.tsx";
import { TransactionAmount } from "@entity/transaction/type-card/TransactionAmount.tsx";
import type { Transaction } from "@entity/transaction";
import {TransactionPaper} from "@entity/transaction/type-card/TransactionPaper.tsx";


interface IncomeTransactionProps {
	transaction: Transaction;
}

const IncomeTransaction: FC<IncomeTransactionProps> = ({ transaction }) => {
	const { locale } = useSettingsContext();

	if (!transaction || transaction.type !== 'income') return;

	return (
		<TransactionPaper>
			<div className="flex items-center gap-4">
				 <TransactionTypeIcon type={transaction.type} />
				 <TransactionTargets
					 to={{ amount: transaction.amount, currency: 'USD', target: transaction.to }} />
			</div>
			 <TransactionAmount amount={transaction.amount} locale={locale} />
		</TransactionPaper>
	);
};

IncomeTransaction.displayName = 'IncomeTransaction';

export { IncomeTransaction };
export type { IncomeTransactionProps };