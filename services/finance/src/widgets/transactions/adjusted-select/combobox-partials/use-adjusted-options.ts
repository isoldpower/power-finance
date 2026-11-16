import { useCallback, useMemo } from "react";
import { toTransactionMoneyView, toTransactionRowView } from "@entity/transactions";
import { useConvertMoney } from "@feature/localization";
import { useLocaleCurrency } from "@internal/shared";

import type { Transaction } from "@entity/transactions";


interface AdjustedOption {
	id: string;
	name: string;
	date: string;
	amount: string;
}

const useAdjustedOptions = (transactions: Transaction[]): {
	options: AdjustedOption[];
	toOption: (transaction: Transaction) => AdjustedOption;
} => {
	const { convert, targetCurrency } = useConvertMoney();
	const formatCurrency = useLocaleCurrency();

	const toOption = useCallback((transaction: Transaction): AdjustedOption => {
		const row = toTransactionRowView(transaction);
		const money = toTransactionMoneyView(transaction, convert, formatCurrency, targetCurrency);

		return { id: transaction.id, name: row.description, date: row.date, amount: money.amountOriginal };
	}, [convert, formatCurrency, targetCurrency]);

	const options = useMemo(() => transactions.map(toOption), [transactions, toOption]);

	return { options, toOption };
};

export { useAdjustedOptions };
export type { AdjustedOption };
