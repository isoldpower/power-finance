import type { TransactionOrigin, TransactionType } from "../types.ts";


const KIND_LABEL: Record<TransactionType, string> = {
	income: 'Income',
	expense: 'Expense',
};

const ORIGIN_LABEL: Record<TransactionOrigin, string> = {
	manual: 'Added manually',
	scanned: 'Scanned receipt',
};

const UNCATEGORIZED_LABEL = 'Uncategorized';

const transactionKindLabel = (type: TransactionType): string => {
	return KIND_LABEL[type];
};

const transactionOriginLabel = (origin: TransactionOrigin): string => {
	return ORIGIN_LABEL[origin];
};

const ledgerSideLabel = (debit: boolean): string => {
	return debit ? 'DR' : 'CR';
};

export { ledgerSideLabel, transactionKindLabel, transactionOriginLabel, UNCATEGORIZED_LABEL };
