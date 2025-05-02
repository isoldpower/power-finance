import { useSettingsContext } from "@internal/shared";
import type { FC } from "react";

import { TransactionTypeIcon } from "@entity/transaction/type-card/TransactionTypeIcon";
import { TransactionTargets } from "@entity/transaction/type-card/TransactionTargets.tsx";
import { TransactionAmount } from "@entity/transaction/type-card/TransactionAmount.tsx";
import type { Transaction } from "@entity/transaction";
import {TransactionPaper} from "@entity/transaction/type-card/TransactionPaper.tsx";


interface AdjustTransactionProps {
	transaction: Transaction;
}

const AdjustTransaction: FC<AdjustTransactionProps> = ({ transaction }) => {
	const { locale } = useSettingsContext();

	if (!transaction || transaction.type !== 'adjust') return;

	return (
		<TransactionPaper>
			<div className="flex items-center gap-4">
				 <TransactionTypeIcon type={transaction.type} />
				 <TransactionTargets
					 to={{ amount: transaction.amount, currency: 'RUB', target: transaction.to }} />
			</div>
			 <TransactionAmount amount={transaction.amount} locale={locale} />
		</TransactionPaper>
	);
};

AdjustTransaction.displayName = 'AdjustTransaction';

export { AdjustTransaction };
export type { AdjustTransactionProps };