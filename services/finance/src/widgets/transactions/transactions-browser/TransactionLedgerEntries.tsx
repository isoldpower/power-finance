import { useMemo } from "react";
import {
	AmountDirectionIcon,
	JournalPostingHeader,
	LedgerLineRow,
	PostingsContainer,
	PostingsDirectionIcon,
	TransactionAmountStack,
	toLedgerEntryViews,
	toTransactionMoneyView,
	toTransactionRowView,
	resolveToneWithDirection,
} from "@entity/transactions";
import { useConvertMoney } from "@feature/localization";
import { useTransactionLedger, TransactionLedgerFx } from "@feature/transactions";
import { useLocaleCurrency } from "@shared/formatting";
import { SpaceOccupant } from "@shared/pure-components/layout";
import { MetaText, RowTitle } from "@shared/pure-components/typography";

import type { FC } from "react";
import type { Transaction } from "@entity/transactions";


interface LedgerTransactionEntriesProps {
	transaction: Transaction;
}

const TransactionLedgerEntries: FC<LedgerTransactionEntriesProps> = ({ transaction }) => {
	const { convert, targetCurrency } = useConvertMoney();
	const formatCurrency = useLocaleCurrency();

	const { entries, isPending } = useTransactionLedger(transaction.id);

	const row = useMemo(() => toTransactionRowView(transaction), [transaction]);
	const money = useMemo(
		() => toTransactionMoneyView(transaction, convert, formatCurrency, targetCurrency),
		[transaction, convert, formatCurrency, targetCurrency]
	);
	const lines = useMemo(
		() => toLedgerEntryViews(entries, formatCurrency),
		[entries, formatCurrency]
	);

	return (
		<div className="max-w-[600px] py-1 pl-[52px] pr-4 pb-4">
			<JournalPostingHeader>
				<JournalPostingHeader.Title>
					DERIVED JOURNAL POSTING
				</JournalPostingHeader.Title>
				<JournalPostingHeader.AiBadge />
				<SpaceOccupant />
				<JournalPostingHeader.Balance>
					<JournalPostingHeader.Check />
					balanced · {money.amountAbsolute}
				</JournalPostingHeader.Balance>
			</JournalPostingHeader>
			<PostingsContainer>
				<PostingsDirectionIcon tone={resolveToneWithDirection(transaction.type)}>
					<AmountDirectionIcon type={row.type} size={14} />
				</PostingsDirectionIcon>
				<div className="min-w-0 flex-1">
					<RowTitle size="12.5" truncate>
						{row.description}
					</RowTitle>
					<MetaText as="div" size="9" tracking="0.08em">
						TRANSACTION · {row.kind}
					</MetaText>
				</div>
				<TransactionAmountStack
					original={money.amountOriginal}
					main={money.amountMain}
					converted={money.converted}
					tone={resolveToneWithDirection(transaction.type)}
				/>
			</PostingsContainer>
			<TransactionLedgerFx isPending={isPending}>
				{lines.map((entry, index) => (
					<LedgerLineRow key={`${row.id}-${entry.account}-${index.toString()}`}>
						<LedgerLineRow.Side debit={entry.debit}>
							{entry.label}
						</LedgerLineRow.Side>
						<LedgerLineRow.Account>
							{entry.account}
						</LedgerLineRow.Account>
						<LedgerLineRow.Kind>
							{entry.debit ? 'debit' : 'credit'}
						</LedgerLineRow.Kind>
						<LedgerLineRow.Amount>
							{entry.amount}
						</LedgerLineRow.Amount>
					</LedgerLineRow>
				))}
			</TransactionLedgerFx>
			<MetaText as="div" size="10.5" className="mt-3">
				{row.provenance}
			</MetaText>
		</div>
	);
};

TransactionLedgerEntries.displayName = 'LedgerTransactionEntries';

export { TransactionLedgerEntries };
export type { LedgerTransactionEntriesProps };
