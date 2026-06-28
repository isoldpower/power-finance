import type { FC } from "react";
import { cn, FinanceBadge } from "@internal/ui-library";

import type { TransactionRowView } from "./types.ts";

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

// Original and converted amounts share one muted accent here so neither competes for attention.
const toneText: Record<TransactionRowView['tone'], string> = {
	pos: 'text-pos',
	neg: 'text-neg',
	neutral: 'text-text-2',
	muted: 'text-text-2',
};

const RowAmount: FC<{ original: string; main: string; converted: boolean; tone: TransactionRowView['tone'] }> = ({ original, main, converted, tone }) => (
	<div className={cn("flex flex-col items-end font-numeric text-[12px] leading-tight", toneText[tone])}>
		<span>{original}</span>
		{converted ? <span>{main}</span> : null}
	</div>
);

const TransactionRow: FC<TransactionRowProps> = ({ row, amountOriginal, amountMain, converted, selected, expanded, onSelect, onExpand }) => {
	const totalDebit = row.lines.find((line) => line.type === 'DR')?.amount ?? amountOriginal;
	return (
		<div className="border-b border-border last:border-b-0">
			<div onClick={onExpand} className="flex h-14 cursor-pointer items-center px-4 hover:bg-secondary">
				<div className="w-[22px]">
					<button
						type="button"
						onClick={(event) => { event.stopPropagation(); onSelect(); }}
						className={cn(
							"flex size-4 flex-none items-center justify-center rounded-[5px] border-[1.5px]",
							selected ? "border-primary bg-primary text-white" : "border-border-strong"
						)}
					>
						{selected ? (
							<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
								<polyline points="20 6 9 17 4 12" />
							</svg>
						) : null}
					</button>
				</div>
				<div className="w-[74px] font-numeric">
					<div className="text-xs">{row.date}</div>
					<div className="text-[10px] text-text-3">{row.time}</div>
				</div>
				<div className="flex min-w-0 flex-1 items-center gap-2.5">
					<div className={`flex size-[30px] flex-none items-center justify-center rounded-[8px] ${row.iconClass}`}>{row.icon}</div>
					<div className="min-w-0">
						<div className="truncate text-[13.5px] font-semibold">{row.kind}</div>
					</div>
				</div>
				<div className="hidden w-[130px] text-[12.5px] text-text-2 md:block">{row.walletName}</div>
				<div className="hidden w-[108px] md:block">
					<FinanceBadge tone="neutral" appearance="outline" size="sm">{row.category}</FinanceBadge>
				</div>
				<div className={cn("w-[104px] text-right font-numeric text-[12px]", toneText[row.tone])}>{amountOriginal}</div>
					<div className="hidden w-[104px] text-right font-numeric text-[12px] md:block">
						{converted ? <span className={toneText[row.tone]}>{amountMain}</span> : <span className="text-text-3">—</span>}
					</div>
				<div className="w-[26px] text-right">
					<span className={cn("inline-block text-[11px] text-text-3 transition-transform", expanded && "rotate-180")}>▾</span>
				</div>
			</div>
			{expanded ? (
				<div className="max-w-[600px] py-1 pl-[52px] pr-4 pb-4">
					<div className="mb-3 flex items-center gap-2">
						<span className="font-numeric text-[9.5px] tracking-[0.12em] text-text-3">DERIVED JOURNAL POSTING</span>
						<FinanceBadge tone="neutral" appearance="outline" size="sm">TODO backend</FinanceBadge>
						<div className="flex-1" />
						<span className="flex items-center gap-1 text-[10.5px] font-semibold text-pos">
							<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
								<polyline points="20 6 9 17 4 12" />
							</svg>
							balanced · {totalDebit}
						</span>
					</div>
					<div className="flex items-center gap-2.5 rounded-[9px] border border-border-strong bg-card px-3 py-2.5">
						<div className={`flex size-7 flex-none items-center justify-center rounded-[7px] ${row.iconClass}`}>{row.icon}</div>
						<div className="min-w-0 flex-1">
							<div className="truncate text-[12.5px] font-semibold">{row.walletName}</div>
							<div className="font-numeric text-[9px] tracking-[0.08em] text-text-3">TRANSACTION · {row.kind}</div>
						</div>
						<RowAmount original={amountOriginal} main={amountMain} converted={converted} tone={row.tone} />
					</div>
					{row.lines.map((line, index) => (
						<div key={`${row.id}-${line.account}-${index.toString()}`} className="ml-[17px] mt-2 flex items-center gap-2.5 rounded-[9px] border border-border bg-card px-3 py-2.5">
							<FinanceBadge tone={line.type === 'DR' ? 'accent' : 'viol'} appearance="soft" size="sm">{line.type}</FinanceBadge>
							<span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold">{line.account}</span>
							<span className="font-numeric text-[9px] uppercase tracking-[0.06em] text-text-3">{line.side}</span>
							<span className="min-w-16 text-right font-display text-[13px] font-semibold">{line.amount}</span>
						</div>
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
