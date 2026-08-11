import {
	AmountDirectionIcon,
	JournalPostingHeader,
	LedgerLineRow,
	LedgerRow,
	PostingsContainer,
	PostingsDirectionIcon,
	resolveToneWithDirection,
	RowSelectCheckbox,
	TransactionAmountStack,
} from "@entity/transactions";
import { Caption, MetaText, RowTitle, Text } from "@shared/pure-components/typography";

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
					<Text as="time" dateTime={row.createdAt} size="xs" className="block">
						{row.date}
					</Text>
					<Caption as="time" dateTime={row.createdAt} size="10" className="block">
						{row.time}
					</Caption>
				</LedgerRow.DateCell>
				<LedgerRow.Description>
					<LedgerRow.Icon tone={tone}>
						<AmountDirectionIcon direction={row.direction} />
					</LedgerRow.Icon>
					<RowTitle truncate className="min-w-0">
						{row.kind}
					</RowTitle>
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
							<RowTitle size="12.5" truncate>
								{row.walletName}
							</RowTitle>
							<MetaText as="div" size="9" tracking="0.08em">
								TRANSACTION · {row.kind}
							</MetaText>
						</div>
						<TransactionAmountStack original={amountOriginal} main={amountMain} converted={converted} tone={tone} />
					</PostingsContainer>
					{row.entries.map((entry, index) => (
						<LedgerLineRow key={`${row.id}-${entry.account}-${index.toString()}`} line={entry} />
					))}
					<MetaText as="div" size="10.5" className="mt-3">{row.provenance}</MetaText>
				</div>
			) : null}
		</div>
	);
};

TransactionRow.displayName = 'TransactionRow';

export { TransactionRow };
export type { TransactionRowProps };
