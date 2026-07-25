import type { FC } from "react";

import type { TransactionPreviewDto } from "@entity/transactions/types.ts";
import { iconClassFromAmount, iconFromAmount, toneFromAmount } from "@entity/transactions/transaction-visual.ts";
import type { LedgerLine } from "@entity/transactions/transactions-table/types.ts";
import { JournalPostingHeader } from "@entity/transactions/transactions-table/JournalPostingHeader.tsx";
import { LedgerLineRow } from "@entity/transactions/transactions-table/LedgerLineRow.tsx";
import { TransactionAmountStack } from "@entity/transactions/transactions-table/TransactionAmountStack.tsx";


interface LedgerTransactionEntriesProps {
	transaction: TransactionPreviewDto;
	walletName: string;
	amountOriginal: string;
	amountMain: string;
	amountAbsolute: string;
	converted: boolean;
}

const TransactionLedgerEntries: FC<LedgerTransactionEntriesProps> = ({
	transaction,
	walletName,
	amountOriginal,
	amountMain,
	amountAbsolute,
	converted,
}) => {
	const amount = parseFloat(transaction.amount);
	const isIncome = amount >= 0;
	const tone = toneFromAmount(amount);
	const icon = iconFromAmount(amount);
	const iconClass = iconClassFromAmount(amount);
	const kind = isIncome ? 'Income' : 'Expense';
	const provenance = `Imported · ${new Date(transaction.created_at).toLocaleString()}`;

	const lines: LedgerLine[] = isIncome
		? [
			{ type: 'DR', account: walletName, side: 'debit', amount: amountAbsolute },
			{ type: 'CR', account: 'Income', side: 'credit', amount: amountAbsolute },
		]
		: [
			{ type: 'DR', account: 'Uncategorized', side: 'debit', amount: amountAbsolute },
			{ type: 'CR', account: walletName, side: 'credit', amount: amountAbsolute },
		];

	return (
		<div className="max-w-[600px] py-1 pl-[52px] pr-4 pb-4">
			<JournalPostingHeader balancedAmount={amountAbsolute} />
			<div className="flex items-center gap-2.5 rounded-[9px] border border-border-strong bg-card px-3 py-2.5">
				<div className={`flex size-7 flex-none items-center justify-center rounded-[7px] ${iconClass}`}>{icon}</div>
				<div className="min-w-0 flex-1">
					<div className="truncate text-[12.5px] font-semibold">{walletName}</div>
					<div className="font-numeric text-[9px] tracking-[0.08em] text-text-3">TRANSACTION · {kind}</div>
				</div>
				<TransactionAmountStack original={amountOriginal} main={amountMain} converted={converted} tone={tone} />
			</div>
			{lines.map((line, index) => (
				<LedgerLineRow key={`${transaction.id}-${line.account}-${index.toString()}`} line={line} />
			))}
			<div className="mt-3 font-numeric text-[10.5px] text-text-3">{provenance}</div>
		</div>
	);
};

TransactionLedgerEntries.displayName = 'LedgerTransactionEntries';

export { TransactionLedgerEntries };
export type { LedgerTransactionEntriesProps };
