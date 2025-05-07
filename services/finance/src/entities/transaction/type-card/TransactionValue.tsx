import { cn } from "@internal/ui-library";
import type { FC } from "react";

import { useLocaleCurrency } from "@shared/utils";
import type { TransactionSide } from "@entity/transaction";


interface TransactionValueProps {
	side: TransactionSide;
	perspective: 'outcome' | 'income' | 'neutral';
}

const TransactionValue: FC<TransactionValueProps> = ({ side, perspective }) => {
	const transformCurrency = useLocaleCurrency();

	return (
		<div className={cn(
			'ml-3 text-right',
			perspective === 'neutral' && 'text-gray-900',
			((side.amount > 0 && perspective === 'outcome') || (side.amount < 0 && perspective === 'income')) && 'text-red-600',
			((side.amount > 0 && perspective === 'income') || (side.amount < 0 && perspective === 'outcome')) && 'text-green-600'
		)}>
			<p className="text-sm font-medium">
				{transformCurrency(side.amount, side.wallet.currency)}
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