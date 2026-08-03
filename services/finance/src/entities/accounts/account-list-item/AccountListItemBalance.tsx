import { FinanceMoney } from "@internal/ui-library";

import type { FC, ReactNode } from "react";
import type { Tone } from "@shared/utils";


interface AccountListItemBalanceProps {
	children: ReactNode;
	tone: Tone;
}

const AccountListItemBalance: FC<AccountListItemBalanceProps> = ({ children, tone }) => {
	return (
		<FinanceMoney tone={tone} size="sm">
			{children}
		</FinanceMoney>
	);
}

AccountListItemBalance.displayName = 'AccountListItemBalance';

export { AccountListItemBalance };
