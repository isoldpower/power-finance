import { useMemo } from "react";

import {
	AmountDirectionIcon,
	JournalPostingHeader,
	LedgerLineRow,
	PostingsContainer,
	PostingsDirectionIcon,
	PostingsKind,
	PostingsWalletName,
	TransactionAmountStack,
	toTransactionMoneyView,
	toTransactionRowView,
	resolveToneWithDirection,
} from "@entity/transactions";
import { useConvertMoney } from "@feature/localization";
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
			<PostingsContainer>
				<PostingsDirectionIcon tone={resolveToneWithDirection(transaction.direction)}>
					<AmountDirectionIcon direction={row.direction} size={14} />
				</PostingsDirectionIcon>
				<div className="min-w-0 flex-1">
					<PostingsWalletName>
						{row.walletName}
					</PostingsWalletName>
					<PostingsKind>
						TRANSACTION · {row.kind}
					</PostingsKind>
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
			<div className="mt-3 font-numeric text-[10.5px] text-text-3">
				{row.provenance}
			</div>
		</div>
	);
};

TransactionLedgerEntries.displayName = 'LedgerTransactionEntries';

export { TransactionLedgerEntries };
export type { LedgerTransactionEntriesProps };
