import type { TransactionEntryType } from "@shared/utils";


interface TransactionEntryFields {
	type: TransactionEntryType;
	amount: string;
	receiveAmount: string;
	fromWallet: string;
	toWallet: string;
}

interface TransactionEntryValues extends TransactionEntryFields {
	category?: string;
}

export type { TransactionEntryFields, TransactionEntryValues };
