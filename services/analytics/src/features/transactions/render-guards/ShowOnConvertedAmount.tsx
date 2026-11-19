import type { FC, ReactNode } from "react";
import type { TransactionBrief } from "@entity/transactions";


interface ShowOnConvertedAmountProps {
	transaction: TransactionBrief;
	children: ReactNode;
}

const ShowOnConvertedAmount: FC<ShowOnConvertedAmountProps> = ({ transaction, children }) => {
	if (transaction.money.currency === transaction.converted.currency) {
		return null;
	}

	return children;
};

ShowOnConvertedAmount.displayName = 'ShowOnConvertedAmount';

export { ShowOnConvertedAmount };
export type { ShowOnConvertedAmountProps };
