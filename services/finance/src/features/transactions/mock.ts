interface MockScanField {
	label: string;
	value: string;
	ai: boolean;
}

const MOCK_TXN_CATEGORIES = ['Groceries', 'Dining', 'Transport', 'Bills', 'Shopping', 'Income'];

const MOCK_SCAN_FIELDS: MockScanField[] = [
	{ label: 'Merchant', value: 'Whole Foods Market', ai: true },
	{ label: 'Date', value: 'Jun 18, 2026', ai: true },
	{ label: 'Category', value: 'Groceries', ai: true },
	{ label: 'Wallet', value: 'Main Checking', ai: false },
];

const MOCK_SCAN_AMOUNT = '−$86.40';
const MOCK_SCAN_CONFIDENCE = '98% sure';

export { MOCK_TXN_CATEGORIES, MOCK_SCAN_FIELDS, MOCK_SCAN_AMOUNT, MOCK_SCAN_CONFIDENCE };
export type { MockScanField };
