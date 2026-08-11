import { useMemo } from "react";

import {
	AmountDirectionIcon,
	JournalPostingHeader,
	LedgerLineRow,
	PostingsContainer,
	PostingsDirectionIcon,
	TransactionAmountStack,
	toTransactionMoneyView,
	toTransactionRowView,
	resolveToneWithDirection,
} from "@entity/transactions";
import { useConvertMoney } from "@feature/localization";
import { useLocaleCurrency } from "@shared/formatting";
import { MetaText, RowTitle } from "@shared/pure-components/typography";

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
			<PostingsContainer>
				<PostingsDirectionIcon tone={resolveToneWithDirection(transaction.direction)}>
					<AmountDirectionIcon direction={row.direction} size={14} />
				</PostingsDirectionIcon>
				<div className="min-w-0 flex-1">
					<RowTitle size="12.5" truncate>
						{row.walletName}
					</RowTitle>
					<MetaText as="div" size="9" tracking="0.08em">
						TRANSACTION · {row.kind}
					</MetaText>
				</div>
				<TransactionAmountStack
					original={money.amountOriginal}
					main={money.amountMain}
					converted={money.converted}
					tone={resolveToneWithDirection(transaction.direction)}
				/>
			</PostingsContainer>
			{row.entries.map((entry, index) => (
				<LedgerLineRow key={`${row.id}-${entry.account}-${index.toString()}`} line={entry} />
			))}
			<MetaText as="div" size="10.5" className="mt-3">
				{row.provenance}
			</MetaText>
		</div>
	);
};

TransactionLedgerEntries.displayName = 'LedgerTransactionEntries';

export { TransactionLedgerEntries };
export type { LedgerTransactionEntriesProps };
