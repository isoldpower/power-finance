const CURRENCY_SYMBOLS: Record<string, string> = {
	USD: '$',
	EUR: '€',
	GBP: '£',
	JPY: '¥',
};

const currencySymbol = (currency: string): string => CURRENCY_SYMBOLS[currency] ?? currency;

const FRACTION_DIGITS_CACHE = new Map<string, number>();

const currencyFractionDigits = (currency: string): number => {
	const code = currency.trim() || 'USD';
	const cached = FRACTION_DIGITS_CACHE.get(code);
	if (cached !== undefined) return cached;

	let digits: number;
	try {
		digits = new Intl.NumberFormat('en', { style: 'currency', currency: code })
			.resolvedOptions()
			.maximumFractionDigits ?? 2;
	} catch {
		digits = 2;
	}

	FRACTION_DIGITS_CACHE.set(code, digits);
	return digits;
};

// Totals are summed from rounded parts so a header never contradicts the rows it sums.
const roundToCurrency = (amount: number, currency: string): number => {
	const factor = 10 ** currencyFractionDigits(currency);
	return Math.round(amount * factor) / factor;
};

export { currencySymbol, currencyFractionDigits, roundToCurrency };

type FormatMoney = (amount: number, currency: string) => string;

export type { FormatMoney };
