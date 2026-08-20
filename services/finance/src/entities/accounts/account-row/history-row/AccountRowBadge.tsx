import { FinanceBadge } from "@internal/ui-library";

import type { FC } from "react";
import type { Types } from "@shared/formatting";


interface AccountRowBadgeProps {
	children: string;
	sideTone: Types;
}

const AccountRowBadge: FC<AccountRowBadgeProps> = ({ children, sideTone }) => (
	<FinanceBadge tone={sideTone === 'pos' ? 'pos' : 'neg'} appearance="soft" size="sm">
		{children}
	</FinanceBadge>
);

AccountRowBadge.displayName = 'AccountRowBadge';

export { AccountRowBadge };
export type { AccountRowBadgeProps };
