import { buildTransferChain } from "./build-transfer-chain.ts";

import type { TransactionChainDraft, TransactionDraft } from "@entity/transactions";
import type {
	CreateTransactionChainResponse,
	CreateTransactionResponse,
} from "../../transactions-api";
import type { TransactionEntryValues } from "../types.ts";


const DEFAULT_NAMES = {
	transfer: 'Transfer',
	income: 'Income',
	expense: 'Expense',
};

interface EntryCurrencies {
	fromCurrency: string;
	toCurrency: string;
}

interface EntryApiMethods {
	createTransaction: (draft: TransactionDraft) => Promise<CreateTransactionResponse>;
	createTransactionChain: (draft: TransactionChainDraft) => Promise<CreateTransactionChainResponse>;
}

const submitEntry = (
	entry: TransactionEntryValues,
	currencies: EntryCurrencies,
	{ createTransaction, createTransactionChain }: EntryApiMethods
): Promise<CreateTransactionResponse | CreateTransactionChainResponse> => {
	const amount = Math.abs(parseFloat(entry.amount));
	const category = entry.category ?? null;
	const name = entry.category ?? DEFAULT_NAMES[entry.type];

	if (entry.type === 'transfer') {
		return createTransactionChain({
			entries: buildTransferChain(
				name,
				category,
				{ walletId: entry.fromWallet, currency: currencies.fromCurrency, amount },
				{
					walletId: entry.toWallet,
					currency: currencies.toCurrency,
					amount: Math.abs(parseFloat(entry.receiveAmount)),
				},
			),
		});
	}

	const income = entry.type === 'income';

	return createTransaction({
		name,
		currency: income ? currencies.toCurrency : currencies.fromCurrency,
		amount,
		walletId: income ? entry.toWallet : entry.fromWallet,
		origin: 'manual',
		type: income ? 'income' : 'expense',
		category,
		evidence: null,
	});
};

export { submitEntry };
export type { EntryApiMethods, EntryCurrencies };
