import type { TransactionPreviewDto } from "../types.ts";
import type { ConvertMoney, TransactionMoneyView } from "./types.ts";
import type { FormatMoney } from "@shared/formatting";


const toTransactionMoneyView = (
	transaction: TransactionPreviewDto,
	convert: ConvertMoney,
	formatMoney: FormatMoney
): TransactionMoneyView => {
	const currency = transaction.currency_code;
	const amount = parseFloat(transaction.amount);
	const main = convert({ amount, currency });

	return {
		walletName: transaction.source_wallet.name,
		amountOriginal: formatMoney(amount, currency),
		amountMain: main.formatted,
		amountAbsolute: formatMoney(Math.abs(amount), currency),
		converted: main.converted,
	};
};

export { toTransactionMoneyView };
