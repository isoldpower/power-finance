import { FinanceBadge } from "@internal/ui-library";

import type { FC } from "react";
import type { LedgerSideTone } from "../../visual-map";


interface AccountRowBadgeProps {
	children: string;
	sideTone: LedgerSideTone;
}

const AccountRowBadge: FC<AccountRowBadgeProps> = ({ children, sideTone }) => (
	<FinanceBadge tone={sideTone} appearance="soft" size="sm" className="rounded-[4px] border-border uppercase">
		{children}
	</FinanceBadge>
);

AccountRowBadge.displayName = 'AccountRowBadge';

export { AccountRowBadge };
export type { AccountRowBadgeProps };
