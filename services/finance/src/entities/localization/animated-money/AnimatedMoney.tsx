import { FinanceMoney } from "@internal/ui-library";

import { parseAmount, toAmountString } from "@shared/api";
import { useLocaleCurrency } from "@shared/formatting";
import { useCountUp } from "@shared/motion";

import type { ComponentProps, FC } from "react";
import type { CountUpOptions } from "@shared/motion";


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
