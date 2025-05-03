import { useLocaleCurrency } from "@shared/utils";
import { cn } from "@internal/ui-library";
import type { FC } from "react";


interface TransactionValueProps {
	amount: number;
	perspective: 'outcome' | 'income';
}

const TransactionValue: FC<TransactionValueProps> = ({ amount, perspective }) => {
	const transformCurrency = useLocaleCurrency();

	return (
		<div className={cn(
			'ml-3 text-right',
			((amount > 0 && perspective === 'income') || (amount < 0 && perspective === 'outcome')) ? 'text-green-600' : 'text-red-600'
		)}>
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