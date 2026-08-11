import { FinanceCard } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const LedgerBalanceCard: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => {
	return (
		<FinanceCard className="flex flex-wrap items-center gap-x-[18px] gap-y-2 px-[18px] py-3" {...props}>
			{children}
		</FinanceCard>
	);
}

LedgerBalanceCard.displayName = "LedgerBalanceCard";

export { LedgerBalanceCard };