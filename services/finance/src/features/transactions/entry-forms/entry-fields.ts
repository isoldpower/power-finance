import { z } from "zod";

import type { TransactionEntryFields } from "./types.ts";


const entryFieldsShape = {
	type: z.enum(['transfer', 'expense', 'income']),
	amount: z.string(),
	receiveAmount: z.string(),
	fromWallet: z.string(),
	toWallet: z.string(),
};

const isPositiveAmount = (value: string | undefined): boolean => {
	const numeric = parseFloat(value ?? '');

	return !Number.isNaN(numeric) && numeric > 0;
};

const isCompleteEntry = (entry: TransactionEntryFields): boolean => {
	if (!isPositiveAmount(entry.amount)) return false;

	const typeBasedChecks = {
		'income': () => entry.toWallet !== '',
		'expense': () => entry.fromWallet !== '',
		'transfer': () => entry.fromWallet !== ''
			&& entry.toWallet !== ''
			&& entry.fromWallet !== entry.toWallet
			&& isPositiveAmount(entry.receiveAmount),
	};

	return typeBasedChecks[entry.type]();
};

export { entryFieldsShape, isPositiveAmount, isCompleteEntry };
