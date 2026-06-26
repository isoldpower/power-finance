const CURRENCY_SYMBOLS: Record<string, string> = {
	USD: '$',
	EUR: '€',
	GBP: '£',
	JPY: '¥',
};

const currencySymbol = (currency: string): string => CURRENCY_SYMBOLS[currency] ?? currency;

// Keeps only digits and a single decimal point so amount inputs can't take letters.
const sanitizeAmountInput = (raw: string): string => {
	const cleaned = raw.replace(/[^0-9.]/g, '');
	const [whole, ...rest] = cleaned.split('.');
	return rest.length > 0 ? `${whole}.${rest.join('')}` : whole;
};

export { currencySymbol, sanitizeAmountInput };
