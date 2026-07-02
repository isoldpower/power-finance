import { FinanceMoney } from "@internal/ui-library";

import type { FC } from "react";
import type { Tone } from "@shared/utils";


interface AccountRowValueProps {
	children: string;
	tone: Tone;
}

const AccountRowValue: FC<AccountRowValueProps> = ({ children, tone }) => (
	<FinanceMoney tone={tone} size="sm" className="min-w-[78px] text-right">
		{children}
	</FinanceMoney>
);

AccountRowValue.displayName = 'AccountRowValue';

export { AccountRowValue };
export type { AccountRowValueProps };
