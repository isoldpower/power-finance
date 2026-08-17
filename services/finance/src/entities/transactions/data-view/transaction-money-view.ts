import type { Transaction } from "../types.ts";
import type { ConvertMoney, TransactionMoneyView } from "./types.ts";
import type { FormatMoney } from "@shared/formatting";


const toTransactionMoneyView = (
	transaction: Transaction,
	convert: ConvertMoney,
	formatMoney: FormatMoney
): TransactionMoneyView => {
	const { currency } = transaction.money;
	const amount = transaction.type === 'expense' ? -transaction.money.amount : transaction.money.amount;
	const main = convert({ amount, currency });

	return {
		walletName: transaction.wallet.name,
		amountOriginal: formatMoney(amount, currency),
		amountMain: main.formatted,
		amountAbsolute: formatMoney(Math.abs(amount), currency),
		converted: main.converted,
	};
};

export { toTransactionMoneyView };
