import { FinanceStat } from "@internal/ui-library";

import { MoneyWithFx } from "@widget/localization";
import { LedgerBalanceBadge, ExplanatoryNeutralBadge, AskAiForHelp } from "@widget/metrics";
import { useLedgerBalance } from "@feature/metrics";
import { LedgerTitle, LedgerCard, LedgerSymbol } from "@entity/accounts";
import { Tooltip } from "@shared/interactions";
import { CenteredList, EndList, SpaceOccupant } from "@shared/components";

import type { FC } from "react";


const LedgerBalanceBand: FC = () => {
	const { ledger, isPending } = useLedgerBalance();

	return (
		<LedgerCard>
			<CenteredList>
				<LedgerTitle>
					Ledger
				</LedgerTitle>
				<ExplanatoryNeutralBadge>
					double-entry
				</ExplanatoryNeutralBadge>
			</CenteredList>
			<div className="hidden sm:flex pl-7">
				<EndList gap={4.5}>
					<Tooltip content="What you own — wallets + receivables">
						<FinanceStat size="sm" label="Assets">
							<MoneyWithFx money={ledger?.assets} isPending={isPending} />
						</FinanceStat>
					</Tooltip>
					<LedgerSymbol>-</LedgerSymbol>
					<Tooltip content="What you owe — credit card balances">
						<FinanceStat size="sm" label="Liabilities">
							<MoneyWithFx money={ledger?.liabilities} isPending={isPending} />
						</FinanceStat>	
					</Tooltip>
					<LedgerSymbol>=</LedgerSymbol>
					<Tooltip content="Assets − liabilities = net worth">
						<FinanceStat size="sm" label="Equity">
							<MoneyWithFx money={ledger?.equity} isPending={isPending} />
						</FinanceStat>
					</Tooltip>
				</EndList>
			</div>
			<SpaceOccupant />
			<Tooltip content={<AskAiForHelp reason="ledger is out of balance" /> }>
				<LedgerBalanceBadge ledger={ledger} isPending={isPending} />
			</Tooltip>
		</LedgerCard>
	);
};

LedgerBalanceBand.displayName = 'LedgerBalanceBand';

export { LedgerBalanceBand };
