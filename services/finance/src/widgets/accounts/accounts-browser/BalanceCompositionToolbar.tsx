import type { FC } from "react";
import { FinanceBadge } from "@internal/ui-library";


const BalanceCompositionToolbar: FC = () => {
	return (
		<div className="flex flex-wrap items-center gap-2.5 border-b border-border px-[18px] py-3.5">
			<span className="text-sm font-semibold">Balance composition</span>
			<FinanceBadge tone="pos" appearance="soft" dot>Assets = Liabilities + Equity</FinanceBadge>
			<div className="flex-1" />
			<span className="hidden font-numeric text-[10px] text-text-3 sm:block">select a category to drill in</span>
		</div>
	);
};

BalanceCompositionToolbar.displayName = 'BalanceCompositionToolbar';

export { BalanceCompositionToolbar };
