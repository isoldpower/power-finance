import { useMemo } from "react";
import {
	AmountDirectionIcon,
	LedgerRow,
	RowSelectCheckbox,
	TransactionChainBadge,
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
	chainLink: boolean;
	chainSize: number | null;
	expanded: boolean;
	checked: boolean;
	onToggle: () => void;
	onCheck: MouseEventHandler<HTMLButtonElement>;
}

const LedgerTransactionRow: FC<LedgerTransactionRowProps> = ({
	transaction,
	chainLink,
	chainSize,
	expanded,
	checked,
	onToggle,
	onCheck,
}) => {
	const { convert, targetCurrency } = useConvertMoney();
	const formatCurrency = useLocaleCurrency();

	const row = useMemo(() => {
		return toTransactionRowView(transaction);
	}, [transaction]);
	const money = useMemo(() => {
		return toTransactionMoneyView(transaction, convert, formatCurrency, targetCurrency);
	}, [transaction, convert, formatCurrency, targetCurrency]);
	const tone = useMemo(() => {
		return resolveToneWithDirection(row.type);
	}, [row.type]);

	return (
		<LedgerRow expanded={expanded} pending={row.pending} onClick={onToggle}>
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
					<div className="flex items-center gap-1.5">
						<RowTitle truncate>
							{row.description}
						</RowTitle>
						{chainLink ? <TransactionChainBadge size={chainSize} /> : null}
					</div>
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
			<LedgerRow.ConvertedAmount tone={tone} inTarget={money.inTarget}>
				{money.amountMain}
			</LedgerRow.ConvertedAmount>
			<LedgerRow.Chevron expanded={expanded} />
		</LedgerRow>
	);
};

LedgerTransactionRow.displayName = 'LedgerTransactionRow';

export { LedgerTransactionRow };
export type { LedgerTransactionRowProps };
