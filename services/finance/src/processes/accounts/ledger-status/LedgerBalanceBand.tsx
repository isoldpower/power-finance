import { FinanceStat } from "@internal/ui-library";

import { MoneyWithFx } from "@widget/localization";
import { BalanceMetricsBadge, ExplanatoryNeutralBadge, AskAiForHelp } from "@widget/metrics";
import { useBalanceMetrics } from "@feature/metrics";
import { LedgerCard, LedgerSymbol } from "@entity/accounts";
import { Tooltip } from "@shared/overlays";
import { CenteredList, EndList, SpaceOccupant } from "@shared/pure-components/layout";
import { Overline } from "@shared/pure-components/typography";

import type { FC } from "react";


const LedgerBalanceBand: FC = () => {
	const { balance, isPending } = useBalanceMetrics();

	return (
		<LedgerCard>
			<CenteredList>
				<Overline as="h2" tracking="0.14em">
					Ledger
				</Overline>
				<ExplanatoryNeutralBadge>
					double-entry
				</ExplanatoryNeutralBadge>
			</CenteredList>
			<div className="hidden sm:flex pl-7">
				<EndList gap={4.5}>
					<Tooltip content="What you own — wallets + receivables">
						<FinanceStat size="sm" label="Assets">
							<MoneyWithFx money={balance?.assets} isPending={isPending} />
						</FinanceStat>
					</Tooltip>
					<LedgerSymbol>-</LedgerSymbol>
					<Tooltip content="What you owe — credit card balances">
						<FinanceStat size="sm" label="Liabilities">
							<MoneyWithFx money={balance?.liabilities} isPending={isPending} />
						</FinanceStat>	
					</Tooltip>
					<LedgerSymbol>=</LedgerSymbol>
					<Tooltip content="Assets − liabilities = net worth">
						<FinanceStat size="sm" label="Equity">
							<MoneyWithFx money={balance?.equity} isPending={isPending} />
						</FinanceStat>
					</Tooltip>
				</EndList>
			</div>
			<SpaceOccupant />
			<Tooltip content={<AskAiForHelp reason="ledger is out of balance" /> }>
				<BalanceMetricsBadge ledger={balance} isPending={isPending} />
			</Tooltip>
		</LedgerCard>
	);
};

LedgerBalanceBand.displayName = 'LedgerBalanceBand';

export { LedgerBalanceBand };
