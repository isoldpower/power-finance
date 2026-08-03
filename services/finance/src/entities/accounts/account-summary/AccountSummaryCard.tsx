import { FinanceCard } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface AccountSummaryCardProps {
	children: ReactNode;
}

const AccountSummaryCard: FC<AccountSummaryCardProps> = ({ children }) => {
	return (
		<FinanceCard className="overflow-hidden">
			{children}
		</FinanceCard>
	);
}

AccountSummaryCard.displayName = 'AccountSummaryCard';

export { AccountSummaryCard };
