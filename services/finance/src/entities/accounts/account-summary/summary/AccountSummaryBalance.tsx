import { FinanceMoney } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";
import type { Types } from "@shared/formatting";


type AccountSummaryBalanceProps = PropsWithChildren<{
	tone: Types;
}>;

const AccountSummaryBalance: FC<AccountSummaryBalanceProps> = ({ children, tone }) => (
	<FinanceMoney tone={tone} size="xl">
		{children}
	</FinanceMoney>
);

AccountSummaryBalance.displayName = 'AccountSummaryBalance';

export { AccountSummaryBalance };
export type { AccountSummaryBalanceProps };
