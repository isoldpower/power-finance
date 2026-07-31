import type { FC } from "react";
import { cn, FinanceBadge } from "@internal/ui-library";

import {
	AmountDirectionIcon,
	RowSelectCheckbox,
	TransactionAmountStack,
	LedgerLineRow,
	JournalPostingHeader,
	directionIconClass,
	toneByDirection,
	toneTextClass,
} from "@entity/transactions";
import type { TransactionRowView } from "@entity/transactions";

interface TransactionRowProps {
	row: TransactionRowView;
	amountOriginal: string;
	amountMain: string;
	converted: boolean;
	selected: boolean;
	expanded: boolean;
	onSelect: () => void;
	onExpand: () => void;
}

const TransactionRow: FC<TransactionRowProps> = ({ row, amountOriginal, amountMain, converted, selected, expanded, onSelect, onExpand }) => {
	const tone = toneByDirection[row.direction];
	const totalDebit = row.entries.find((entry) => entry.side === 'debit')?.amount ?? amountOriginal;

	return (
		<div className="border-b border-border last:border-b-0">
			<div onClick={onExpand} className="flex h-14 cursor-pointer items-center px-4 hover:bg-secondary">
				<div className="w-[22px]">
					<RowSelectCheckbox selected={selected} onClick={(event) => { event.stopPropagation(); onSelect(); }} />
				</div>
				<div className="w-[74px] font-numeric">
					<div className="text-xs">{row.date}</div>
					<div className="text-[10px] text-text-3">{row.time}</div>
				</div>
				<div className="flex min-w-0 flex-1 items-center gap-2.5">
					<div className={cn("flex size-[30px] flex-none items-center justify-center rounded-[8px]", directionIconClass[row.direction])}>
						<AmountDirectionIcon direction={row.direction} />
					</div>
					<div className="min-w-0">
						<div className="truncate text-[13.5px] font-semibold">{row.kind}</div>
					</div>
				</div>
				<div className="hidden w-[130px] text-[12.5px] text-text-2 md:block">{row.walletName}</div>
				<div className="hidden w-[108px] md:block">
					<FinanceBadge tone="neutral" appearance="outline" size="sm">{row.category}</FinanceBadge>
				</div>
				<div className={cn("w-[104px] text-right font-numeric text-[12px]", toneTextClass[tone])}>{amountOriginal}</div>
					<div className="hidden w-[104px] text-right font-numeric text-[12px] md:block">
						{converted ? <span className={toneTextClass[tone]}>{amountMain}</span> : <span className="text-text-3">—</span>}
					</div>
				<div className="w-[26px] text-right">
					<span className={cn("inline-block text-[11px] text-text-3 transition-transform", expanded && "rotate-180")}>▾</span>
				</div>
			</div>
			{expanded ? (
				<div className="max-w-[600px] py-1 pl-[52px] pr-4 pb-4">
					<JournalPostingHeader balancedAmount={totalDebit} />
					<div className="flex items-center gap-2.5 rounded-[9px] border border-border-strong bg-card px-3 py-2.5">
						<div className={cn("flex size-7 flex-none items-center justify-center rounded-[7px]", directionIconClass[row.direction])}>
							<AmountDirectionIcon direction={row.direction} size={14} />
						</div>
						<div className="min-w-0 flex-1">
							<div className="truncate text-[12.5px] font-semibold">{row.walletName}</div>
							<div className="font-numeric text-[9px] tracking-[0.08em] text-text-3">TRANSACTION · {row.kind}</div>
						</div>
						<TransactionAmountStack original={amountOriginal} main={amountMain} converted={converted} tone={tone} />
					</div>
					{row.entries.map((entry, index) => (
						<LedgerLineRow key={`${row.id}-${entry.account}-${index.toString()}`} line={entry} />
					))}
					<div className="mt-3 font-numeric text-[10.5px] text-text-3">{row.provenance}</div>
				</div>
			) : null}
		</div>
	);
};

TransactionRow.displayName = 'TransactionRow';

export { TransactionRow };
export type { TransactionRowProps };
