import { FinanceCard } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type LedgerBalanceCardProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const LedgerBalanceCard: FC<LedgerBalanceCardProps> = ({
	children,
	...props
}) => (
	<FinanceCard
		className="flex flex-wrap items-center gap-x-[18px] gap-y-2 px-[18px] py-3"
		{...props}
	>
		{children}
	</FinanceCard>
);

LedgerBalanceCard.displayName = 'LedgerBalanceCard';

export { LedgerBalanceCard };
export type { LedgerBalanceCardProps };
