import type { FC } from "react";
import { FinanceBadge } from "@internal/ui-library";

import type { LedgerEntryView } from "../data-view/types.ts";

interface LedgerLineRowProps {
	line: LedgerEntryView;
}

const LedgerLineRow: FC<LedgerLineRowProps> = ({ line }) => (
	<div className="ml-[17px] mt-2 flex items-center gap-2.5 rounded-[9px] border border-border bg-card px-3 py-2.5">
		<FinanceBadge tone={line.side === 'debit' ? 'accent' : 'viol'} appearance="soft" size="sm">{line.label}</FinanceBadge>
		<span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold">{line.account}</span>
		<span className="font-numeric text-[9px] uppercase tracking-[0.06em] text-text-3">{line.side}</span>
		<span className="min-w-16 text-right font-display text-[13px] font-semibold">{line.amount}</span>
	</div>
);

LedgerLineRow.displayName = 'LedgerLineRow';

export { LedgerLineRow };
export type { LedgerLineRowProps };
