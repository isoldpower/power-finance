const FRACTION_DIGITS_CACHE = new Map<string, number>();


function retrieveWithCacheMiddleware (
	cacheKey: string,
	noCacheCallback: (cacheKey: string) => number,
) {
	const cacheOccurrence = FRACTION_DIGITS_CACHE.get(cacheKey);
	if (cacheOccurrence !== undefined) {
		return cacheOccurrence;
	}
	
	const actualValue = noCacheCallback(cacheKey);
	
	FRACTION_DIGITS_CACHE.set(cacheKey, actualValue);
	return actualValue;
}

function currencyFractionDigits(currency: string): number {
	const currencyCode = currency.trim() || 'USD';
	
	return retrieveWithCacheMiddleware(currencyCode, (currencyCode) => {
		try {
			return new Intl.NumberFormat('en', { style: 'currency', currency: currencyCode })
				.resolvedOptions()
				.maximumFractionDigits ?? 2;
		} catch {
			return 2;
		}
	});
}

function roundToCurrency(amount: number, currency: string): number {
	const factor = 10 ** currencyFractionDigits(currency);

	return Math.round(amount * factor) / factor;
}

export { roundToCurrency };