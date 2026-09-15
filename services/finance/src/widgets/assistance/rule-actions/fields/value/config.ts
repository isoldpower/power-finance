import type { SelectOption } from "@shared/forms";


const TRANSACTION_TYPE_OPTIONS: SelectOption[] = [
	{ value: 'expense', label: 'Expense' },
	{ value: 'income', label: 'Income' },
];

const TRANSACTION_ORIGIN_OPTIONS: SelectOption[] = [
	{ value: 'manual', label: 'Manual' },
	{ value: 'scanned', label: 'Scanned' },
	{ value: 'automation', label: 'Automation' },
];

export { TRANSACTION_ORIGIN_OPTIONS, TRANSACTION_TYPE_OPTIONS };
