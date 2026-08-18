import { useMemo } from "react";
import {
	AmountDirectionIcon,
	LedgerRow,
	RowSelectCheckbox,
	resolveToneWithDirection,
	toTransactionMoneyView,
	toTransactionRowView,
} from "@entity/transactions";
import { useConvertMoney } from "@feature/localization";
import { useLocaleCurrency } from "@shared/formatting";
import { Caption, RowTitle, Text } from "@shared/pure-components/typography";

import type { FC, MouseEventHandler } from "react";
import type { Transaction } from "@entity/transactions";


interface LedgerTransactionRowProps {
	transaction: Transaction;
	expanded: boolean;
	checked: boolean;
	onToggle: () => void;
	onCheck: MouseEventHandler<HTMLButtonElement>;
}

const LedgerTransactionRow: FC<LedgerTransactionRowProps> = ({
	transaction,
	expanded,
	checked,
	onToggle,
	onCheck,
}) => {
	const { convert } = useConvertMoney();
	const formatCurrency = useLocaleCurrency();

	const row = useMemo(() => toTransactionRowView(transaction), [transaction]);
	const money = useMemo(
		() => toTransactionMoneyView(transaction, convert, formatCurrency),
		[transaction, convert, formatCurrency]
	);
	const tone = useMemo(() => resolveToneWithDirection(row.type), [row.type]);

	return (
		<LedgerRow expanded={expanded} onClick={onToggle}>
			<LedgerRow.SelectCell>
				<RowSelectCheckbox selected={checked} onClick={onCheck} />
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
					<AmountDirectionIcon type={row.type} />
				</LedgerRow.Icon>
				<div className="min-w-0">
					<RowTitle truncate>
						{row.description}
					</RowTitle>
					{row.scanned ? (
						<Text as="div" size="10.5" tone="accent" className="flex items-center gap-1">
							⛶ scanned receipt
						</Text>
					) : null}
				</div>
			</LedgerRow.Description>
			<LedgerRow.Wallet>
				{row.walletName}
			</LedgerRow.Wallet>
			<LedgerRow.Category>
				{row.category}
			</LedgerRow.Category>
			<LedgerRow.Amount tone={tone}>
				{money.amountOriginal}
			</LedgerRow.Amount>
			<LedgerRow.ConvertedAmount tone={tone} converted={money.converted}>
				{money.amountMain}
			</LedgerRow.ConvertedAmount>
			<LedgerRow.Chevron expanded={expanded} />
		</LedgerRow>
	);
};

LedgerTransactionRow.displayName = 'LedgerTransactionRow';

export { LedgerTransactionRow };
export type { LedgerTransactionRowProps };
