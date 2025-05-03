import { useLocaleCurrency } from "@shared/utils";
import type { FC } from "react";


interface TransactionValueProps {
	amount: number;
}

const TransactionValue: FC<TransactionValueProps> = ({ amount }) => {
	const transformCurrency = useLocaleCurrency();

	return (
		<div className={`ml-3 text-right ${
			amount > 0 ? 'text-green-600' : 'text-red-600'
		}`}>
			<p className="text-sm font-medium">
				{transformCurrency(amount, 'USD')}
			</p>
			<p className="text-xs text-gray-500 mt-1">
				Some category
			</p>
		</div>
	);
};

TransactionValue.displayName = 'TransactionValue';

export { TransactionValue };
export type { TransactionValueProps };