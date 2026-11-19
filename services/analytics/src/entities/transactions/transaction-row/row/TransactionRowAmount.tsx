import { useMemo } from "react";
import { Text } from "@internal/shared";

import type { FC, PropsWithChildren } from "react";


type TransactionRowAmountProps = PropsWithChildren<{
	income: boolean;
	amount: string;
}>;

const TransactionRowAmount: FC<TransactionRowAmountProps> = ({ income, amount, children }) => {
	const signedAmount = useMemo(() => {
		return `${income ? '+' : '−'}${amount}`;
	}, [income, amount]);

	return (
		<span className="flex shrink-0 flex-col items-end">
			<Text size="13" weight="semibold" family="numeric" tone={income ? 'positive' : 'default'}>
				{signedAmount}
			</Text>
			{children}
		</span>
	);
};

TransactionRowAmount.displayName = 'TransactionRowAmount';

export { TransactionRowAmount };
export type { TransactionRowAmountProps };
