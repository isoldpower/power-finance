import { absoluteAmount, parseAmountDecimal } from "@internal/shared";
import { buildTransferChain } from "./build-transfer-chain.ts";

import type { Transaction, TransactionChainDraft, TransactionDraft } from "@entity/transactions";
import type {
	CreateTransactionAdjustmentResponse,
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
	createAdjustment: (adjusted: Transaction, draft: TransactionDraft) => Promise<CreateTransactionAdjustmentResponse>;
}

type EntrySubmitResponse =
	| CreateTransactionResponse
	| CreateTransactionChainResponse
	| CreateTransactionAdjustmentResponse;

const submitEntry = (
	entry: TransactionEntryValues,
	currencies: EntryCurrencies,
	{ createTransaction, createTransactionChain, createAdjustment }: EntryApiMethods,
	adjusted: Transaction | null = null,
): Promise<EntrySubmitResponse> => {
	const amount = absoluteAmount(parseAmountDecimal(entry.amount));
	const category = entry.category ?? null;
	const name = entry.name
		?? (adjusted ? `${adjusted.name} adjustment` : undefined)
		?? entry.category?.name
		?? DEFAULT_NAMES[entry.type];

	if (entry.type === 'transfer') {
		return createTransactionChain({
			entries: buildTransferChain(
				name,
				category,
				{ 
					walletId: entry.fromWallet,
					currency: currencies.fromCurrency,
					amount,
				},
				{
					walletId: entry.toWallet,
					currency: currencies.toCurrency,
					amount: absoluteAmount(parseAmountDecimal(entry.receiveAmount)),
				},
			),
		});
	}

	const income = entry.type === 'income';
	const draft: TransactionDraft = {
		name,
		currency: income ? currencies.toCurrency : currencies.fromCurrency,
		amount,
		walletId: income ? entry.toWallet : entry.fromWallet,
		origin: 'manual',
		type: income ? 'income' : 'expense',
		category,
		evidence: null,
	};

	return adjusted ? createAdjustment(adjusted, draft) : createTransaction(draft);
};

export { submitEntry };
export type { EntryApiMethods, EntryCurrencies, EntrySubmitResponse };
