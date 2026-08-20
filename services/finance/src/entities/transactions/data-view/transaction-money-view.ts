import type { Transaction } from "../types.ts";
import type { ConvertMoney, TransactionMoneyView } from "./types.ts";
import type { FormatMoney } from "@shared/formatting";


const toTransactionMoneyView = (
	transaction: Transaction,
	convert: ConvertMoney,
	formatMoney: FormatMoney,
	targetCurrency: string
): TransactionMoneyView => {
	const { currency } = transaction.money;
	const signedAmount = transaction.type === 'expense' 
		? -transaction.money.amount 
		: transaction.money.amount;
	const mainAmount = convert({ 
		amount: signedAmount,
		currency,
	});

	return {
		walletName: transaction.wallet.name,
		amountOriginal: formatMoney(signedAmount, currency),
		amountMain: mainAmount.formatted,
		amountAbsolute: formatMoney(Math.abs(signedAmount), currency),
		converted: mainAmount.converted,
		inTarget: mainAmount.currency === targetCurrency,
	};
};

export { toTransactionMoneyView };
