import type { FC } from "react";
import { cn, FinanceBadge } from "@internal/ui-library";

import type { TransactionPreviewDto } from "@entity/transactions";
import { toneFromAmount, iconClassFromAmount, iconFromAmount, toneTextClass } from "@entity/transactions/transaction-visual.ts";


interface LedgerTransactionRowProps {
	transaction: TransactionPreviewDto;
	walletName: string;
	amountOriginal: string;
	amountMain: string;
	converted: boolean;
	expanded: boolean;
	onToggle: () => void;
}

const LedgerTransactionRow: FC<LedgerTransactionRowProps> = ({
	transaction,
	walletName,
	amountOriginal,
	amountMain,
	converted,
	expanded,
	onToggle,
}) => {
	const amount = parseFloat(transaction.amount);
	const created = new Date(transaction.created_at);
	const date = created.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
	const time = created.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
	const tone = toneFromAmount(amount);
	const icon = iconFromAmount(amount);
	const iconClass = iconClassFromAmount(amount);
	const kind = amount >= 0 ? 'Income' : 'Expense';
	const category = 'Uncategorized';

	return (
		<div onClick={onToggle} className={cn(
			"flex h-14 cursor-pointer items-center px-4", 
			!expanded && "hover:bg-secondary"
		)}>
			<div className="w-[74px] font-numeric">
				<div className="text-xs">{date}</div>
				<div className="text-[10px] text-text-3">{time}</div>
			</div>
			<div className="flex min-w-0 flex-1 items-center gap-2.5">
				<div className={`flex size-[30px] flex-none items-center justify-center rounded-[8px] ${iconClass}`}>{icon}</div>
				<div className="min-w-0">
					<div className="truncate text-[13.5px] font-semibold">{kind}</div>
				</div>
			</div>
			<div className="hidden w-[130px] text-[12.5px] text-text-2 md:block">{walletName}</div>
			<div className="hidden w-[108px] md:block">
				<FinanceBadge tone="neutral" appearance="outline" size="sm">{category}</FinanceBadge>
			</div>
			<div className={cn("w-[104px] text-right font-numeric text-[12px]", toneTextClass[tone])}>{amountOriginal}</div>
			<div className="hidden w-[104px] text-right font-numeric text-[12px] md:block">
				{converted ? <span className={toneTextClass[tone]}>{amountMain}</span> : <span className="text-text-3">—</span>}
			</div>
			<div className="w-[26px] text-right">
				<span className={cn("inline-block text-[11px] text-text-3 transition-transform", expanded && "rotate-180")}>▾</span>
			</div>
		</div>
	);
};

LedgerTransactionRow.displayName = 'LedgerTransactionRow';

export { LedgerTransactionRow };
export type { LedgerTransactionRowProps };
