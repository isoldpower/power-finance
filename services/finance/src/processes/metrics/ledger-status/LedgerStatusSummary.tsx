import type { FC } from "react";
import { FinanceCard, FinanceStat, FinanceBadge } from "@internal/ui-library";

import { useLedgerBalance } from "@feature/metrics";
import { RouteLink } from "@feature/navigation";
import { MoneyWithFx } from "@widget/localization";
import { LedgerBalanceBadge } from "@widget/metrics";
import { Tooltip } from "@shared/interactions";


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
				<Tooltip content="What you own — wallets + receivables">
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
				</Tooltip>
				<span className="pb-0.5 text-[15px] font-medium text-text-2">−</span>
				<Tooltip content="What you owe — credit card balances">
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
				</Tooltip>
				<span className="pb-0.5 text-[15px] font-medium text-text-2">=</span>
				<Tooltip content="Assets − liabilities = net worth">
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
				</Tooltip>
			</div>
			<div className="flex-1" />
			<div className="flex items-center gap-3">
				<LedgerBalanceBadge ledger={ledger} />
				<RouteLink
					to="management"
					className="whitespace-nowrap text-xs font-semibold text-primary hover:underline"
				>
					Manage →
				</RouteLink>
			</div>
		</FinanceCard>
	);
};

LedgerStatusSummary.displayName = 'LedgerStatusSummary';

export { LedgerStatusSummary };
