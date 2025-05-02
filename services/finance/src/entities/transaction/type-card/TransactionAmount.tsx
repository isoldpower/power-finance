import type { FC } from "react";

interface TransactionAmountProps {
	amount: number;
	locale: string;
}

const TransactionAmount: FC<TransactionAmountProps> = ({ amount, locale }) => {
	return (
		<div className="text-lg font-bold text-gray-800">
			{amount.toLocaleString(locale, {
				style: 'currency',
				currency: 'USD',
			})}
		</div>
	);
};

TransactionAmount.displayName = 'TransactionAmount';

export { TransactionAmount };
export type { TransactionAmountProps };