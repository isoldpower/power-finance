import { buildTransferChain } from "../transaction-actions";

import type {
	CreateTransactionChainResponse,
	CreateTransactionResponse,
	TransactionChainPayload,
	TransactionMinimalPayload,
} from "../transactions-api";
import type { TransactionEntryValues } from "./types.ts";


interface EntryApiMethods {
	createTransaction: (data: TransactionMinimalPayload) => Promise<CreateTransactionResponse>;
	createTransactionChain: (data: TransactionChainPayload) => Promise<CreateTransactionChainResponse>;
}

const submitEntry = (
	entry: TransactionEntryValues,
	{ createTransaction, createTransactionChain }: EntryApiMethods
): Promise<CreateTransactionResponse | CreateTransactionChainResponse> => {
	const sent = Math.abs(parseFloat(entry.amount));
	const value = sent.toFixed(2);

	if (entry.type === 'transfer') {
		return createTransactionChain({
			transactions: buildTransferChain(
				entry.fromWallet,
				entry.toWallet,
				sent,
				Math.abs(parseFloat(entry.receiveAmount))
			),
		});
	}

	if (entry.type === 'income') {
		return createTransaction({
			source_wallet_id: entry.toWallet,
			amount: value,
			category: entry.category,
		});
	}

	return createTransaction({
		source_wallet_id: entry.fromWallet,
		amount: `-${value}`,
		category: entry.category,
	});
};

export { submitEntry };
export type { EntryApiMethods };
