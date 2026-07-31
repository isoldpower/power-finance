import { useMemo } from "react";

import {
	AmountDirectionIcon,
	JournalPostingHeader,
	LedgerLineRow,
	TransactionAmountStack,
	directionIconClass,
	toneByDirection,
	toTransactionMoneyView,
	toTransactionRowView,
} from "@entity/transactions";
import { useConvertMoney } from "@feature/localization";
import { cn } from "@internal/ui-library";
import { useLocaleCurrency } from "@shared/utils";

import type { FC } from "react";
import type { TransactionPreviewDto } from "@entity/transactions";


interface LedgerTransactionEntriesProps {
	transaction: TransactionPreviewDto;
}

const TransactionLedgerEntries: FC<LedgerTransactionEntriesProps> = ({ transaction }) => {
	const { convert } = useConvertMoney();
	const formatCurrency = useLocaleCurrency();

	const row = useMemo(() => toTransactionRowView(transaction, formatCurrency), [transaction, formatCurrency]);
	const money = useMemo(() => toTransactionMoneyView(transaction, convert, formatCurrency), [transaction, convert, formatCurrency]);

	return (
		<div className="max-w-[600px] py-1 pl-[52px] pr-4 pb-4">
			<JournalPostingHeader balancedAmount={money.amountAbsolute} />
			<div className="flex items-center gap-2.5 rounded-[9px] border border-border-strong bg-card px-3 py-2.5">
				<div className={cn("flex size-7 flex-none items-center justify-center rounded-[7px]", directionIconClass[row.direction])}>
					<AmountDirectionIcon direction={row.direction} size={14} />
				</div>
				<div className="min-w-0 flex-1">
					<div className="truncate text-[12.5px] font-semibold">{row.walletName}</div>
					<div className="font-numeric text-[9px] tracking-[0.08em] text-text-3">TRANSACTION · {row.kind}</div>
				</div>
				<TransactionAmountStack
					original={money.amountOriginal}
					main={money.amountMain}
					converted={money.converted}
					tone={toneByDirection[row.direction]}
				/>
			</div>
			{row.entries.map((entry, index) => (
				<LedgerLineRow key={`${row.id}-${entry.account}-${index.toString()}`} line={entry} />
			))}
			<div className="mt-3 font-numeric text-[10.5px] text-text-3">{row.provenance}</div>
		</div>
	);
};

TransactionLedgerEntries.displayName = 'LedgerTransactionEntries';

export { TransactionLedgerEntries };
export type { LedgerTransactionEntriesProps };
