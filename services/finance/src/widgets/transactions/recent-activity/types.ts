import { toTransactionDayView } from "@entity/transactions";

import type { ChainBound, TransactionRowView } from "@entity/transactions";


type TransactionDayView = ReturnType<typeof toTransactionDayView>;

interface DayOfActivityData extends TransactionDayView {
	startPosition: number;
	entries: ChainBound<TransactionRowView>[];
}


export type { DayOfActivityData };