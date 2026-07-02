import type { ComponentProps, FC } from "react";
import { FinanceMoney } from "@internal/ui-library";

import { useLocaleCurrency, useCountUp } from "@shared/utils";
import type { CountUpOptions } from "@shared/utils";


type FinanceMoneyProps = ComponentProps<typeof FinanceMoney>;

interface AnimatedMoneyProps extends Omit<FinanceMoneyProps, "children"> {
	amount: number;
	currency: string;
	countUp?: CountUpOptions;
	bare?: boolean;
}

const AnimatedMoney: FC<AnimatedMoneyProps> = ({ amount, currency, countUp, bare = false, ...moneyProps }) => {
	const formatCurrency = useLocaleCurrency();
	const value = useCountUp(amount, countUp);
	const formatted = formatCurrency(value ?? amount, currency);

	if (bare) {
		return (
			<>{formatted}</>
		);
	}
	
	return (
		<FinanceMoney {...moneyProps}>{formatted}</FinanceMoney>
	);
};

AnimatedMoney.displayName = 'AnimatedMoney';

export { AnimatedMoney };
export type { AnimatedMoneyProps };
