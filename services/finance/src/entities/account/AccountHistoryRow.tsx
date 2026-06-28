import type { FC } from "react";
import { FinanceMoney, FinanceBadge } from "@internal/ui-library";
import type { Tone } from "@shared/utils";

interface AccountHistoryRowProps {
	icon: string;
	iconClass: string;
	description: string;
	date: string;
	side: string;
	sideTone: Tone;
	amountFormatted: string;
	amountTone: Tone;
}

const AccountHistoryRow: FC<AccountHistoryRowProps> = ({ icon, iconClass, description, date, side, sideTone, amountFormatted, amountTone }) => (
	<div className="flex items-center gap-3 border-b border-border px-[18px] py-2.5 last:border-b-0 hover:bg-secondary">
		<div className={`flex size-[30px] flex-none items-center justify-center rounded-[8px] ${iconClass}`}>{icon}</div>
		<div className="min-w-0 flex-1">
			<div className="truncate text-[13px] font-semibold">{description}</div>
			<div className="font-numeric text-[10.5px] text-text-3">{date}</div>
		</div>
		<FinanceBadge tone={sideTone === 'pos' ? 'pos' : 'neg'} appearance="soft" size="sm">{side}</FinanceBadge>
		<FinanceMoney tone={amountTone} size="sm" className="min-w-[78px] text-right">{amountFormatted}</FinanceMoney>
	</div>
);

AccountHistoryRow.displayName = 'AccountHistoryRow';

export { AccountHistoryRow };
export type { AccountHistoryRowProps };
