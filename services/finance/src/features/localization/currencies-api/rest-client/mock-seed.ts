interface CatalogEntry {
	code: string;
	symbol: string;
	name: string;
	decimals: number;
	usdRate: number;
}

const CURRENCY_CATALOG: CatalogEntry[] = [
	{ code: 'USD', symbol: '$', name: 'US Dollar', decimals: 2, usdRate: 1 },
	{ code: 'EUR', symbol: '€', name: 'Euro', decimals: 2, usdRate: 0.92 },
	{ code: 'GBP', symbol: '£', name: 'Br. Pound', decimals: 2, usdRate: 0.79 },
	{ code: 'JPY', symbol: '¥', name: 'Yen', decimals: 0, usdRate: 156 },
	{ code: 'CAD', symbol: 'C$', name: 'Can. Dollar', decimals: 2, usdRate: 1.37 },
	{ code: 'AUD', symbol: 'A$', name: 'Aus. Dollar', decimals: 2, usdRate: 1.52 },
	{ code: 'NZD', symbol: 'N$', name: 'NZ Dollar', decimals: 2, usdRate: 1.64 },
	{ code: 'CHF', symbol: 'Fr', name: 'Swiss Franc', decimals: 2, usdRate: 0.88 },
	{ code: 'CNY', symbol: '¥', name: 'Yuan', decimals: 2, usdRate: 7.24 },
	{ code: 'INR', symbol: '₹', name: 'Rupee', decimals: 2, usdRate: 83.4 },
	{ code: 'BRL', symbol: 'R$', name: 'Real', decimals: 2, usdRate: 5.1 },
	{ code: 'MXN', symbol: 'M$', name: 'Mex. Peso', decimals: 2, usdRate: 17 },
	{ code: 'KRW', symbol: '₩', name: 'Won', decimals: 0, usdRate: 1370 },
	{ code: 'SGD', symbol: 'S$', name: 'Sing. Dollar', decimals: 2, usdRate: 1.35 },
	{ code: 'HKD', symbol: 'H$', name: 'HK Dollar', decimals: 2, usdRate: 7.81 },
	{ code: 'NOK', symbol: 'kr', name: 'Nor. Krone', decimals: 2, usdRate: 10.7 },
	{ code: 'SEK', symbol: 'kr', name: 'Swe. Krona', decimals: 2, usdRate: 10.5 },
	{ code: 'DKK', symbol: 'kr', name: 'Dan. Krone', decimals: 2, usdRate: 6.9 },
	{ code: 'PLN', symbol: 'zł', name: 'Zloty', decimals: 2, usdRate: 3.95 },
	{ code: 'CZK', symbol: 'Kč', name: 'Koruna', decimals: 2, usdRate: 23 },
	{ code: 'HUF', symbol: 'Ft', name: 'Forint', decimals: 2, usdRate: 360 },
	{ code: 'ZAR', symbol: 'R', name: 'Rand', decimals: 2, usdRate: 18.6 },
	{ code: 'TRY', symbol: '₺', name: 'Lira', decimals: 2, usdRate: 32.5 },
	{ code: 'THB', symbol: '฿', name: 'Baht', decimals: 2, usdRate: 36.5 },
	{ code: 'AED', symbol: 'Dh', name: 'Dirham', decimals: 2, usdRate: 3.67 },
	{ code: 'SAR', symbol: '﷼', name: 'Riyal', decimals: 2, usdRate: 3.75 },
	{ code: 'ILS', symbol: '₪', name: 'Shekel', decimals: 2, usdRate: 3.7 },
	{ code: 'RUB', symbol: '₽', name: 'Ruble', decimals: 2, usdRate: 81.5 },
];

export { CURRENCY_CATALOG };
export type { CatalogEntry };
