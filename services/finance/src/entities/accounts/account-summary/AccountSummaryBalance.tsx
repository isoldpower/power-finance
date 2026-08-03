import { FinanceMoney } from "@internal/ui-library";

import type { FC, ReactNode } from "react";
import type { Tone } from "@shared/utils";


interface AccountSummaryBalanceProps {
	children: ReactNode;
	tone: Tone;
}

const AccountSummaryBalance: FC<AccountSummaryBalanceProps> = ({ children, tone }) => {
	return (
		<FinanceMoney tone={tone} size="xl">
			{children}
		</FinanceMoney>
	);
}

AccountSummaryBalance.displayName = 'AccountSummaryBalance';

export { AccountSummaryBalance };
