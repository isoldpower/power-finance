const RATES_PER_USD: Record<string, number> = {
	USD: 1,
	EUR: 0.92,
	GBP: 0.79,
	CHF: 0.88,
	CAD: 1.36,
	AUD: 1.52,
	JPY: 151.2,
	PLN: 3.98,
	CZK: 23.1,
	SEK: 10.6,
	UAH: 41.2,
	TRY: 34.1,
};

const isSupportedCurrency = (currency: string): boolean => currency in RATES_PER_USD;

const ratePerUsd = (currency: string): number => RATES_PER_USD[currency] ?? 1;

const convertAmount = (amount: number, from: string, to: string): number => {
	return from === to ? amount : (amount / ratePerUsd(from)) * ratePerUsd(to);
};

export { convertAmount, isSupportedCurrency };
