import type { CategoryRef } from "@entity/categories";
import type { TransactionEntryType } from "@entity/transactions";


interface TransactionEntryFields {
	type: TransactionEntryType;
	amount: string;
	receiveAmount: string;
	fromWallet: string;
	toWallet: string;
}

interface TransactionEntryValues extends TransactionEntryFields {
	category?: CategoryRef | null;
	name?: string;
	adjusts?: string;
}

export type { TransactionEntryFields, TransactionEntryValues };
