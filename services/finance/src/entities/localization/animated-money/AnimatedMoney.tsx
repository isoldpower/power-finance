import { FinanceMoney } from "@internal/ui-library";

import { parseAmount, toAmountString, useCountUp, useLocaleCurrency } from "@internal/shared";
import type { CountUpOptions } from "@internal/shared";

import type { ComponentProps, FC } from "react";


type FinanceMoneyProps = ComponentProps<typeof FinanceMoney>;

interface AnimatedMoneyProps extends Omit<FinanceMoneyProps, "children"> {
	amount: string;
	currency: string;
	countUp?: CountUpOptions;
	bare?: boolean;
}

const AnimatedMoney: FC<AnimatedMoneyProps> = ({
	amount,
	currency,
	countUp,
	bare = false,
	...moneyProps
}) => {
	const formatCurrency = useLocaleCurrency();
	const target = parseAmount(amount);
	const animatedValue = useCountUp(target, countUp);
	const settled = animatedValue === null || animatedValue === target;
	const formatted = settled
		? formatCurrency(amount, currency)
		: formatCurrency(toAmountString(animatedValue), currency);

	return bare ? formatted : (
		<FinanceMoney {...moneyProps}>
			{formatted}
		</FinanceMoney>
	);
};

AnimatedMoney.displayName = 'AnimatedMoney';

export { AnimatedMoney };
export type { AnimatedMoneyProps };
