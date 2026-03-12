import type { StorageTransaction } from "./types.ts";
import type { TransactionMinimalPayload } from "../types.ts";
import type { Wallet } from "@entity/wallet";
import type { TransactionDto } from "@entity/transaction";
import { v4 as uuidv4 } from "uuid";

const createTransactionFromMinimalPayload = (
	{ description, sender, receiver, type }: TransactionMinimalPayload
): StorageTransaction => {
	const timestamp = new Date().toISOString();
	const id = uuidv4();

	return {
		id,
		type,
		description: description,
		createdAt: timestamp,
		sender: sender ? {
			wallet: sender.wallet_id,
			amount: sender.amount
		} : undefined,
		receiver: receiver ? {
			wallet: receiver.wallet_id,
			amount: receiver.amount
		} : undefined,
	} satisfies StorageTransaction;
};

const storageToTransaction = (
	wallets: Wallet[],
	value: StorageTransaction
): TransactionDto => {
	const { ...rest } = value;
	const fromWallet = wallets.find((wallet) => {
		return wallet.id === value.sender?.wallet;
	});
	const toWallet = wallets.find((wallet) => {
		return wallet.id === value.receiver?.wallet;
	});

	return {
		...rest,
		sender: ((value.sender && fromWallet) ? { 
			wallet: fromWallet, 
			amount: value.sender.amount 
		} : undefined),
		receiver: ((value.receiver && toWallet) ? {
			wallet: toWallet, 
			amount: value.receiver.amount 
		} : undefined)
	} as TransactionDto;
}

export { createTransactionFromMinimalPayload, storageToTransaction };