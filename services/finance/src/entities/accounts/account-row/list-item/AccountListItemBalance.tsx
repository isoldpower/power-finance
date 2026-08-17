import { FinanceMoney } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";
import type { Tone } from "@shared/formatting";


type AccountListItemBalanceProps = PropsWithChildren<{
	tone: Tone;
}>;

const AccountListItemBalance: FC<AccountListItemBalanceProps> = ({ children, tone }) => (
	<FinanceMoney tone={tone} size="sm">
		{children}
	</FinanceMoney>
);

AccountListItemBalance.displayName = 'AccountListItemBalance';

export { AccountListItemBalance };
export type { AccountListItemBalanceProps };
