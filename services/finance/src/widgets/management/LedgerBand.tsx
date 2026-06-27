import type { FC } from "react";
import { cn, FinanceCard, FinanceStat, FinanceBadge, FinanceTooltip } from "@internal/ui-library";

import { AnimatedMoney } from "@shared/components";
import { useLedgerBalance } from "@feature/summary";
import { useConvertMoney } from "@feature/fx";
import type { Money } from "@feature/fx";

interface LedgerBandProps {
	className?: string;
}

const LedgerBand: FC<LedgerBandProps> = ({ className }) => {
	const { ledger, isPending } = useLedgerBalance();
	const { convert } = useConvertMoney();

	const placeholder = isPending ? '…' : '—';
	const animated = (money: Money | undefined) => {
		if (!money) return placeholder;
		const value = convert(money);
		return <AnimatedMoney bare amount={value.amount} currency={value.currency} />;
	};
	const assets = animated(ledger?.assets);
	const liabilities = animated(ledger?.liabilities);
	const equity = animated(ledger?.equity);

	return (
		<FinanceCard className={cn("flex flex-wrap items-center gap-x-[18px] gap-y-2 px-[18px] py-3", className)}>
			<div className="flex items-center gap-2.5">
				<span className="font-numeric text-[11px] uppercase tracking-[0.14em] text-text-3">Ledger</span>
				<FinanceBadge tone="neutral" appearance="outline" size="sm">double-entry</FinanceBadge>
			</div>
			<div className="hidden items-end gap-[18px] sm:flex">
				<div className="h-7 w-px self-center bg-border-strong" />
				<FinanceTooltip content="What you own — wallets + receivables">
					<div className="cursor-help"><FinanceStat size="sm" label="Assets" value={assets} /></div>
				</FinanceTooltip>
				<span className="pb-0.5 text-[15px] font-medium text-text-2">−</span>
				<FinanceTooltip content="What you owe — credit card balances">
					<div className="cursor-help"><FinanceStat size="sm" label="Liabilities" value={liabilities} /></div>
				</FinanceTooltip>
				<span className="pb-0.5 text-[15px] font-medium text-text-2">=</span>
				<FinanceTooltip content="Assets − liabilities = net worth">
					<div className="cursor-help"><FinanceStat size="sm" label="Equity" value={equity} /></div>
				</FinanceTooltip>
			</div>
			<div className="flex-1" />
			{ledger?.balanced ? <FinanceBadge tone="pos" appearance="soft" dot>balanced</FinanceBadge> : null}
		</FinanceCard>
	);
};

LedgerBand.displayName = 'LedgerBand';

export { LedgerBand };
