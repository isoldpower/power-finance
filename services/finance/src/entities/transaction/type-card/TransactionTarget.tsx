import type { FC } from "react";
import type { Wallet } from "@entity/wallet";
import { cn } from "@internal/ui-library";
import { useLocaleCurrency } from "@shared/utils";


interface TransactionTargetOptions {
	target: Wallet;
	amount: number;
	currency: string;
}

interface TransactionTargetProps {
	target: TransactionTargetOptions;
	receiver?: boolean;
}

const TransactionTarget: FC<TransactionTargetProps> = ({
	target,
	receiver = true
}) => {
	const formatCurrency = useLocaleCurrency();
	const negative = !((target.amount > 0 && receiver) || (target.amount < 0 && !receiver));

	return (
		<div className="flex flex-col basis-full gap-2 p-4 rounded-lg">
			<h4 className="text-lg text-gray-950">{target.target.name}</h4>
			<span className={cn(negative ? 'text-red-500' : 'text-green-500')}>
				{negative ? '-' : '+'}
				{formatCurrency(target.amount, target.currency)}
			</span>
		</div>
	)
}

export { TransactionTarget };
export type { TransactionTargetOptions, TransactionTargetProps };
