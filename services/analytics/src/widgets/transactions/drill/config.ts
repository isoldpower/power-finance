import type { TransactionsOrder } from "@entity/transactions";
import type { SegmentedOption } from "@shared/charts";


const DRILL_ROW_STAGGER_MS = 18;
const DRILL_EMPTY_HEIGHT = 160;

const ORDER_OPTIONS: SegmentedOption<TransactionsOrder>[] = [
	{ value: 'amount_desc', label: 'Largest' },
	{ value: 'created_desc', label: 'Latest' },
];

export { DRILL_EMPTY_HEIGHT, DRILL_ROW_STAGGER_MS, ORDER_OPTIONS };
