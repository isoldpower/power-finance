import { FinanceMoney } from "@internal/ui-library";

import type { ComponentProps, FC, PropsWithChildren } from "react";


type FinanceMoneyProps = ComponentProps<typeof FinanceMoney>;

type MoneyInOriginalAmountProps = PropsWithChildren<{
	tone?: FinanceMoneyProps['tone'];
	size?: FinanceMoneyProps['size'];
}>;

const MoneyInOriginalAmount: FC<MoneyInOriginalAmountProps> = ({ children, tone, size }) => (
	<FinanceMoney tone={tone} size={size}>
		{children}
	</FinanceMoney>
);

MoneyInOriginalAmount.displayName = 'MoneyInOriginalAmount';

export { MoneyInOriginalAmount };
export type { MoneyInOriginalAmountProps };
