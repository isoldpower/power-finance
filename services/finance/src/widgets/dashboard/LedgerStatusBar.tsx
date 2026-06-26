import type { FC } from "react";
import { Link } from "@tanstack/react-router";
import { getFinanceRoute } from "@internal/shared";
import { FinanceCard, FinanceStat, FinanceBadge } from "@internal/ui-library";

// TODO wire to backend
const MOCK_LEDGER = {
	assets: "$18,880.50",
	liabilities: "$640.20",
	equity: "$18,240.30",
};

const LedgerStatusBar: FC = () => {
	return (
		<FinanceCard className="flex flex-wrap items-center gap-[18px] px-[18px] py-3">
			<div className="flex items-center gap-2.5">
				<span className="font-numeric text-[11px] uppercase tracking-[0.14em] text-text-3">Ledger</span>
				<FinanceBadge tone="neutral" appearance="outline" size="sm">double-entry</FinanceBadge>
			</div>
			<div className="hidden h-7 w-px bg-border sm:block" />
			<FinanceStat size="sm" label="Assets" value={MOCK_LEDGER.assets} className="hidden sm:flex" />
			<span className="hidden text-text-3 sm:block">−</span>
			<FinanceStat size="sm" label="Liabilities" value={MOCK_LEDGER.liabilities} className="hidden sm:flex" />
			<span className="hidden text-text-3 sm:block">=</span>
			<FinanceStat size="sm" label="Equity" value={MOCK_LEDGER.equity} className="hidden sm:flex" />
			<div className="flex-1" />
			<div className="flex items-center gap-3">
				<FinanceBadge tone="pos" appearance="soft" dot>balanced</FinanceBadge>
				<Link to={getFinanceRoute('management')} className="whitespace-nowrap text-xs font-semibold text-primary hover:underline">
					Manage →
				</Link>
			</div>
		</FinanceCard>
	);
};

LedgerStatusBar.displayName = 'LedgerStatusBar';

export { LedgerStatusBar };
