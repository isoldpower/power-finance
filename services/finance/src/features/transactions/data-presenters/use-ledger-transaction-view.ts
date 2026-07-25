import { useMemo } from "react";
import type { TransactionPreviewDto } from "@entity/transactions";

import { useConvertMoney } from "@feature/localization";
import { useLocaleCurrency } from "@shared/utils";


interface LedgerTransactionView {
	walletName: string;
	amountOriginal: string;
	amountMain: string;
	amountAbsolute: string;
	converted: boolean;
}

const useLedgerTransactionView = (transaction: TransactionPreviewDto): LedgerTransactionView => {
	const { convert } = useConvertMoney();
	const formatCurrency = useLocaleCurrency();

	return useMemo(() => {
		const wallet = transaction.source_wallet;
		const currency = wallet.balance.currency;
		const amount = parseFloat(transaction.amount);
		const main = convert({ amount, currency });

		return {
			walletName: wallet.name,
			amountOriginal: formatCurrency(amount, currency),
			amountMain: main.formatted,
			amountAbsolute: formatCurrency(Math.abs(amount), currency),
			converted: main.converted,
		};
	}, [convert, formatCurrency, transaction]);
};

export { useLedgerTransactionView };
export type { LedgerTransactionView };
