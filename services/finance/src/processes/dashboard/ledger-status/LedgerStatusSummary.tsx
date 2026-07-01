import type { FC } from "react";
import { Link } from "@tanstack/react-router";
import { getFinanceRoute } from "@internal/shared";
import { FinanceCard, FinanceStat, FinanceBadge, FinanceTooltip } from "@internal/ui-library";

import { useLedgerBalance } from "@feature/summary";
import { MoneyWithFx } from "@widget/dashboard/partials/MoneyWithFx.tsx";
import { LedgerBalanceBadge } from "@widget/dashboard/partials/BalanceBadge.tsx";


const LedgerStatusSummary: FC = () => {
	const { ledger, isPending } = useLedgerBalance();

	return (
		<FinanceCard className="flex flex-wrap items-center gap-x-[18px] gap-y-2 px-[18px] py-3">
			<div className="flex items-center gap-2.5">
				<span className="font-numeric text-[11px] uppercase tracking-[0.14em] text-text-3">
					Ledger
				</span>
				<FinanceBadge tone="neutral" appearance="outline" size="sm">
					double-entry
				</FinanceBadge>
			</div>
			<div className="hidden items-end gap-[18px] sm:flex">
				<div className="h-7 w-px self-center bg-border-strong" />
				<FinanceTooltip content="What you own — wallets + receivables">
					<div className="cursor-help">
						<FinanceStat 
							size="sm" 
							label="Assets" 
							value={(
								<MoneyWithFx 
									money={ledger?.assets}
									isPending={isPending} />
							)} />
					</div>
				</FinanceTooltip>
				<span className="pb-0.5 text-[15px] font-medium text-text-2">−</span>
				<FinanceTooltip content="What you owe — credit card balances">
					<div className="cursor-help">
						<FinanceStat 
							size="sm" 
							label="Liabilities" 
							value={(
								<MoneyWithFx 
									money={ledger?.liabilities}
									isPending={isPending} />
							)} />
					</div>
				</FinanceTooltip>
				<span className="pb-0.5 text-[15px] font-medium text-text-2">=</span>
				<FinanceTooltip content="Assets − liabilities = net worth">
					<div className="cursor-help">
						<FinanceStat 
							size="sm"
							label="Equity" 
							value={(
								<MoneyWithFx 
									money={ledger?.equity}
									isPending={isPending} />
							)} />
					</div>
				</FinanceTooltip>
			</div>
			<div className="flex-1" />
			<div className="flex items-center gap-3">
				<LedgerBalanceBadge ledger={ledger} />
				<Link 
					to={getFinanceRoute('management')} 
					className="whitespace-nowrap text-xs font-semibold text-primary hover:underline"
				>
					Manage →
				</Link>
			</div>
		</FinanceCard>
	);
};

LedgerStatusSummary.displayName = 'LedgerStatusSummary';

export { LedgerStatusSummary };
