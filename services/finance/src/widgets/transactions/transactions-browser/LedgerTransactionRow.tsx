import { useMemo } from "react";

import {
	AmountDirectionIcon,
	LedgerRow,
	resolveToneWithDirection,
	toTransactionMoneyView,
	toTransactionRowView,
} from "@entity/transactions";
import { useConvertMoney } from "@feature/localization";
import { useLocaleCurrency } from "@shared/utils";

import type { FC } from "react";
import type { TransactionPreviewDto } from "@entity/transactions";


interface LedgerTransactionRowProps {
	transaction: TransactionPreviewDto;
	expanded: boolean;
	onToggle: () => void;
}

const LedgerTransactionRow: FC<LedgerTransactionRowProps> = ({
	transaction,
	expanded,
	onToggle,
}) => {
	const { convert } = useConvertMoney();
	const formatCurrency = useLocaleCurrency();

	const row = useMemo(() => toTransactionRowView(transaction, formatCurrency), [transaction, formatCurrency]);
	const money = useMemo(() => toTransactionMoneyView(transaction, convert, formatCurrency), [transaction, convert, formatCurrency]);
	const tone = useMemo(() => resolveToneWithDirection(row.direction), [row.direction]);

	return (
		<LedgerRow.Container expanded={expanded} onClick={onToggle}>
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
				{money.amountOriginal}
			</LedgerRow.Amount>
			<LedgerRow.ConvertedAmount tone={tone} converted={money.converted}>
				{money.amountMain}
			</LedgerRow.ConvertedAmount>
			<LedgerRow.Chevron expanded={expanded} />
		</LedgerRow.Container>
	);
};

LedgerTransactionRow.displayName = 'LedgerTransactionRow';

export { LedgerTransactionRow };
export type { LedgerTransactionRowProps };
