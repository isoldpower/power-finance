import { DEFAULT_CURRENCY, DEFAULT_FRACTION_DIGITS } from "./config.ts";


const FRACTION_DIGITS_CACHE = new Map<string, number>();

function resolveFractionDigits(currencyCode: string): number {
	try {
		return new Intl.NumberFormat('en', { style: 'currency', currency: currencyCode })
			.resolvedOptions()
			.maximumFractionDigits ?? DEFAULT_FRACTION_DIGITS;
	} catch {
		return DEFAULT_FRACTION_DIGITS;
	}
}

function currencyFractionDigits(currency: string): number {
	const currencyCode = currency.trim() || DEFAULT_CURRENCY;
	const cachedDigits = FRACTION_DIGITS_CACHE.get(currencyCode);

	if (cachedDigits !== undefined) {
		return cachedDigits;
	}

	const resolvedDigits = resolveFractionDigits(currencyCode);
	FRACTION_DIGITS_CACHE.set(currencyCode, resolvedDigits);

	return resolvedDigits;
}

function rememberFractionDigits(currency: string, decimals: number): void {
	FRACTION_DIGITS_CACHE.set(currency.trim() || DEFAULT_CURRENCY, decimals);
}

export { currencyFractionDigits, rememberFractionDigits };
