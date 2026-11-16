import type { CurrencyDto } from "./types.ts";


const MOCK_CURRENCY_CATALOG: readonly CurrencyDto[] = [
	{ code: 'USD', symbol: '$', name: 'US Dollar', decimals: 2 },
	{ code: 'EUR', symbol: '€', name: 'Euro', decimals: 2 },
	{ code: 'GBP', symbol: '£', name: 'Br. Pound', decimals: 2 },
	{ code: 'JPY', symbol: '¥', name: 'Yen', decimals: 0 },
	{ code: 'CAD', symbol: 'C$', name: 'Can. Dollar', decimals: 2 },
	{ code: 'AUD', symbol: 'A$', name: 'Aus. Dollar', decimals: 2 },
	{ code: 'CHF', symbol: 'Fr', name: 'Swiss Franc', decimals: 2 },
	{ code: 'CNY', symbol: '¥', name: 'Yuan', decimals: 2 },
	{ code: 'INR', symbol: '₹', name: 'Rupee', decimals: 2 },
	{ code: 'PLN', symbol: 'zł', name: 'Zloty', decimals: 2 },
];

export { MOCK_CURRENCY_CATALOG };
