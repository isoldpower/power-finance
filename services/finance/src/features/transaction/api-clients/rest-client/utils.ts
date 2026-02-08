import type {StorageTransaction} from "./types.ts";
import type {TransactionMinimalPayload} from "../types.ts";
import type {Wallet} from "@entity/wallet";
import type {Transaction} from "@entity/transaction";
import {v4 as uuidv4} from "uuid";

const createTransactionFromMinimalPayload = (
	{ description, from, to, type }: TransactionMinimalPayload
): StorageTransaction => {
	const timestamp = new Date().toISOString();
	const id = uuidv4();

	return {
		id,
		type,
		description: description,
		createdAt: timestamp,
		from,
		to,
	} satisfies StorageTransaction;
};

const storageToTransaction = (
	wallets: Wallet[],
	value: StorageTransaction
): Transaction => {
	const { ...rest } = value;
	const fromWallet = wallets.find((wallet) => wallet.id === value.from?.wallet);
	const toWallet = wallets.find((wallet) => wallet.id === value.to?.wallet);

	return {
		...rest,
		from: (value.from && fromWallet
			? { wallet: fromWallet, amount: value.from.amount }
			: undefined),
		to: (value.to && toWallet
			? { wallet: toWallet, amount: value.to.amount }
			: undefined)
	} as Transaction;
}

export { createTransactionFromMinimalPayload, storageToTransaction };