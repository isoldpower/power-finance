import { FinanceStat, FinanceBadge } from "@internal/ui-library";
import { MoneyWithFx } from "@widget/localization";
import { BalanceMetricsBadge } from "@widget/metrics";
import { useBalanceMetrics } from "@feature/metrics";
import { RouteLink } from "@shared/routing";
import { FormulaOperator, LedgerBalanceCard } from "@entity/accounts";
import { Tooltip } from "@shared/overlays";
import { Overline, UnderlinedLink } from "@shared/pure-components/typography";
import {CenteredList, SpaceOccupant} from "@shared/pure-components/layout";

import type { FC } from "react";


const LedgerStatusSummary: FC = () => {
	const { balance, isPending } = useBalanceMetrics();

	return (
		<LedgerBalanceCard>
			<CenteredList gap={2.5}>
				<Overline as="h2" tracking="0.14em">
					Ledger
				</Overline>
				<FinanceBadge tone="neutral" appearance="outline" size="sm">
					double-entry
				</FinanceBadge>
			</CenteredList>
			<div className="hidden items-end gap-[18px] sm:flex ml-4">
				<Tooltip content="What you own — wallets + receivables">
					<FinanceStat size="sm" label="Assets">
						<MoneyWithFx money={balance?.assets} isPending={isPending} />
					</FinanceStat>
				</Tooltip>
				<FormulaOperator>−</FormulaOperator>
				<Tooltip content="What you owe — credit card balances">
					<FinanceStat size="sm" label="Liabilities">
						<MoneyWithFx money={balance?.liabilities} isPending={isPending} />
					</FinanceStat>
				</Tooltip>
				<FormulaOperator>=</FormulaOperator>
				<Tooltip content="Assets − liabilities = net worth">
					<FinanceStat size="sm" label="Equity"> 
						<MoneyWithFx money={balance?.equity} isPending={isPending} />
					</FinanceStat>
				</Tooltip>
			</div>
			<SpaceOccupant />
			<CenteredList gap={3}>
				<BalanceMetricsBadge ledger={balance} isPending={isPending} />
				<RouteLink to="management">
					<UnderlinedLink>Manage →</UnderlinedLink>
				</RouteLink>
			</CenteredList>
		</LedgerBalanceCard>
	);
};

LedgerStatusSummary.displayName = 'LedgerStatusSummary';

export { LedgerStatusSummary };
