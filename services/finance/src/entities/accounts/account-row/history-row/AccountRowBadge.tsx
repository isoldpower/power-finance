import { FinanceBadge } from "@internal/ui-library";

import type { FC } from "react";
import type { Tone } from "@shared/formatting";


interface AccountRowBadgeProps {
	children: string;
	sideTone: Tone;
}

const AccountRowBadge: FC<AccountRowBadgeProps> = ({ children, sideTone }) => (
	<FinanceBadge tone={sideTone === 'pos' ? 'pos' : 'neg'} appearance="soft" size="sm">
		{children}
	</FinanceBadge>
);

AccountRowBadge.displayName = 'AccountRowBadge';

export { AccountRowBadge };
export type { AccountRowBadgeProps };
