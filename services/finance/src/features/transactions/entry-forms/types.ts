import type { TransactionEntryType } from "@shared/formatting";


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
