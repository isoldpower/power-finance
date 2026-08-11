import { FinanceBadge } from "@internal/ui-library";

import type { LedgerEntryView } from "../data-view";
import type { FC } from "react";
import { DisplayText, Overline, RowTitle } from "@shared/pure-components/typography";


interface LedgerLineRowProps {
	line: LedgerEntryView;
}

const LedgerLineRow: FC<LedgerLineRowProps> = ({ line }) => (
	<div className="ml-[17px] mt-2 flex items-center gap-2.5 rounded-[9px] border border-border bg-card px-3 py-2.5">
		<FinanceBadge tone={line.side === 'debit' ? 'accent' : 'viol'} appearance="soft" size="sm">
			{line.label}
		</FinanceBadge>
		<RowTitle as="span" size="12.5" truncate className="min-w-0 flex-1">
			{line.account}
		</RowTitle>
		<Overline as="span" size="9" tracking="0.06em">
			{line.side}
		</Overline>
		<DisplayText as="span" size="13" className="min-w-16 text-right">
			{line.amount}
		</DisplayText>
	</div>
);

LedgerLineRow.displayName = 'LedgerLineRow';

export { LedgerLineRow };
export type { LedgerLineRowProps };
