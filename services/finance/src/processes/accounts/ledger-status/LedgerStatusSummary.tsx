import { FinanceStat, FinanceBadge } from "@internal/ui-library";

import { MoneyWithFx } from "@widget/localization";
import { LedgerBalanceBadge } from "@widget/metrics";
import { useLedgerBalance } from "@feature/metrics";
import { RouteLink } from "@feature/navigation";
import { UnderlinedLink } from "@entity/navigation";
import { BalanceIcon, LedgerBalanceCard, LedgerTitle } from "@entity/accounts";
import { Tooltip } from "@shared/interactions";

import type { FC } from "react";


const LedgerStatusSummary: FC = () => {
	const { ledger, isPending } = useLedgerBalance();

	return (
		<LedgerBalanceCard>
			<div className="flex items-center gap-2.5">
				<LedgerTitle>
					Ledger
				</LedgerTitle>
				<FinanceBadge tone="neutral" appearance="outline" size="sm">
					double-entry
				</FinanceBadge>
			</div>
			<div className="hidden items-end gap-[18px] sm:flex ml-4">
				<Tooltip content="What you own — wallets + receivables">
					<FinanceStat size="sm" label="Assets">
						<MoneyWithFx money={ledger?.assets} isPending={isPending} />
					</FinanceStat>
				</Tooltip>
				<BalanceIcon>−</BalanceIcon>
				<Tooltip content="What you owe — credit card balances">
					<FinanceStat size="sm" label="Liabilities">
						<MoneyWithFx money={ledger?.liabilities} isPending={isPending} />
					</FinanceStat>
				</Tooltip>
				<BalanceIcon>=</BalanceIcon>
				<Tooltip content="Assets − liabilities = net worth">
					<FinanceStat size="sm" label="Equity"> 
						<MoneyWithFx money={ledger?.equity} isPending={isPending} />
					</FinanceStat>
				</Tooltip>
			</div>
			<div className="flex-1" />
			<div className="flex items-center gap-3">
				<LedgerBalanceBadge ledger={ledger} isPending={isPending} />
				<RouteLink to="management">
					<UnderlinedLink>Manage →</UnderlinedLink>
				</RouteLink>
			</div>
		</LedgerBalanceCard>
	);
};

LedgerStatusSummary.displayName = 'LedgerStatusSummary';

export { LedgerStatusSummary };
