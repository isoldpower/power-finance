import { FinanceCard } from "@internal/ui-library";
import type { FC, ReactNode } from "react";


interface LedgerCardProps {
	children: ReactNode;
}

const LedgerCard: FC<LedgerCardProps> = ({ children }) => (
	<FinanceCard className="flex flex-wrap items-center gap-x-[18px] gap-y-2 px-[18px] py-3">
		{children}
	</FinanceCard>
)

export { LedgerCard };
export type { LedgerCardProps };