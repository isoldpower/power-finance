import type { FC } from "react";
import { FinanceBadge, FinanceCard } from "@internal/ui-library";

const ManagementPage: FC = () => {
	return (
		<div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-[22px] pb-[70px] pt-[22px]">
			<div className="flex flex-wrap items-center gap-3.5">
				<h1 className="font-display text-2xl font-semibold tracking-[-0.01em]">Management</h1>
				<span className="font-numeric text-[11px] uppercase tracking-[0.08em] text-text-3">
					Wallets · Transactions · Ledger
				</span>
			</div>
			<FinanceCard className="flex flex-col items-center gap-3 px-6 py-16 text-center">
				<FinanceBadge tone="accent" appearance="soft">Coming soon</FinanceBadge>
				<div className="font-display text-lg font-semibold">Manage wallets and transactions</div>
				<p className="max-w-md text-sm text-text-2">
					The full transaction table, filters, receipt scanning, transfers and wallet editing
					move here next.
				</p>
			</FinanceCard>
		</div>
	);
};

ManagementPage.displayName = 'ManagementPage';

export { ManagementPage };
export default ManagementPage;
