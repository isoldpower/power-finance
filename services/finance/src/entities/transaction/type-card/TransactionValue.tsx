import type { FC } from "react";

import { useLocaleCurrency } from "@shared/utils";


interface TransactionValueProps {
	amount: string;
	currencyCode: string;
}

const TransactionValue: FC<TransactionValueProps> = ({ amount, currencyCode }) => {
	const transformCurrency = useLocaleCurrency();
	const numericAmount = parseFloat(amount);

	return (
		<div className="ml-3 text-right">
			<p className="text-sm font-medium">
				{transformCurrency(numericAmount, currencyCode)}
			</p>
		</div>
	);
};

TransactionValue.displayName = 'TransactionValue';

export { TransactionValue };
export type { TransactionValueProps };
