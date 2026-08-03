import {
	AmountDirectionIcon,
	JournalPostingHeader,
	LedgerLineRow,
	LedgerRow,
	PostingsContainer,
	PostingsDirectionIcon,
	PostingsKind,
	PostingsWalletName,
	resolveToneWithDirection,
	RowSelectCheckbox,
	TransactionAmountStack,
} from "@entity/transactions";

import type { FC } from "react";
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
	const tone = resolveToneWithDirection(row.direction);
	const totalDebit = row.entries.find((entry) => entry.side === 'debit')?.amount ?? amountOriginal;

	return (
		<div className="border-b border-border last:border-b-0">
			<LedgerRow.Container expanded={expanded} onClick={onExpand}>
				<LedgerRow.SelectCell>
					<RowSelectCheckbox selected={selected} onClick={(event) => { event.stopPropagation(); onSelect(); }} />
				</LedgerRow.SelectCell>
				<LedgerRow.DateCell>
					<LedgerRow.Date>
						{row.date}
					</LedgerRow.Date>
					<LedgerRow.Time>
						{row.time}
					</LedgerRow.Time>
				</LedgerRow.DateCell>
				<LedgerRow.Description>
					<LedgerRow.Icon tone={tone}>
						<AmountDirectionIcon direction={row.direction} />
					</LedgerRow.Icon>
					<LedgerRow.Title>
						{row.kind}
					</LedgerRow.Title>
				</LedgerRow.Description>
				<LedgerRow.Wallet>
					{row.walletName}
				</LedgerRow.Wallet>
				<LedgerRow.Category>
					{row.category}
				</LedgerRow.Category>
				<LedgerRow.Amount tone={tone}>
					{amountOriginal}
				</LedgerRow.Amount>
				<LedgerRow.ConvertedAmount tone={tone} converted={converted}>
					{amountMain}
				</LedgerRow.ConvertedAmount>
				<LedgerRow.Chevron expanded={expanded} />
			</LedgerRow.Container>
			{expanded ? (
				<div className="max-w-[600px] py-1 pl-[52px] pr-4 pb-4">
					<JournalPostingHeader balancedAmount={totalDebit} />
					<PostingsContainer>
						<PostingsDirectionIcon tone={tone}>
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
						<TransactionAmountStack original={amountOriginal} main={amountMain} converted={converted} tone={tone} />
					</PostingsContainer>
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
