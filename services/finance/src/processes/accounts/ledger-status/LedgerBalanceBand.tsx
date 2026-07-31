import type { FC } from "react";
import { FinanceStat } from "@internal/ui-library";

import { useLedgerBalance } from "@feature/metrics";
import { MoneyWithFx } from "@widget/localization";
import { LedgerBalanceBadge } from "@widget/metrics";
import { Tooltip } from "@shared/interactions";
import { LedgerTitle } from "@entity/metrics";
import { ExplanatoryNeutralBadge } from "@widget/metrics/ledger/ExplanatoryNeutralBadge.tsx";
import { CenteredList } from "@shared/components";
import {LedgerCard} from "@entity/metrics/cards/LedgerCard.tsx";
import {AskAiForHelp} from "@widget/metrics/ledger/AskAiForHelp.tsx";


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
			<div className="hidden items-end gap-[18px] sm:flex pl-7">
				<Tooltip content="What you own — wallets + receivables">
					<FinanceStat size="sm" label="Assets">
						<MoneyWithFx money={ledger?.assets} isPending={isPending} />
					</FinanceStat>
				</Tooltip>
				<span className="pb-0.5 text-[15px] font-medium text-text-2">−</span>
				<Tooltip content="What you owe — credit card balances">
					<FinanceStat size="sm" label="Liabilities">
						<MoneyWithFx money={ledger?.liabilities} isPending={isPending} />
					</FinanceStat>	
				</Tooltip>
				<span className="pb-0.5 text-[15px] font-medium text-text-2">=</span>
				<Tooltip content="Assets − liabilities = net worth">
					<FinanceStat size="sm" label="Equity">
						<MoneyWithFx money={ledger?.equity} isPending={isPending} />
					</FinanceStat>
				</Tooltip>
			</div>
			<div className="flex-1" />
			<Tooltip content={<AskAiForHelp reason="ledger is out of balance" /> }>
				<LedgerBalanceBadge ledger={ledger} isPending={isPending} />
			</Tooltip>
		</LedgerCard>
	);
};

LedgerBalanceBand.displayName = 'LedgerBalanceBand';

export { LedgerBalanceBand };
