import type {
	IFxRESTApiClient,
	FxRatesGetRequest,
	FxRatesGetResponse,
} from "../types.ts";

const MOCK_DELAY_MS = 250;

const delay = <T>(value: T): Promise<T> =>
	new Promise((resolve) => setTimeout(() => { resolve(value); }, MOCK_DELAY_MS));

// USD-based reference rates (units of currency per 1 USD). Approximate; covers the
// commonly-picked currencies so a main-currency change actually re-converts values.
const USD_RATES: Record<string, number> = {
	USD: 1,
	EUR: 0.92,
	GBP: 0.79,
	JPY: 156,
	CAD: 1.37,
	AUD: 1.52,
	CHF: 0.88,
	CNY: 7.24,
	INR: 83.4,
	BRL: 5.1,
	MXN: 17,
	KRW: 1370,
	SGD: 1.35,
	HKD: 7.81,
	NOK: 10.7,
	SEK: 10.5,
	DKK: 6.9,
	PLN: 3.95,
	CZK: 23,
	HUF: 360,
	ZAR: 18.6,
	TRY: 32.5,
	NZD: 1.64,
	THB: 36.5,
	AED: 3.67,
	SAR: 3.75,
	ILS: 3.7,
};

class FxMockRESTApiClient implements IFxRESTApiClient {
	public getRates(request: FxRatesGetRequest): Promise<FxRatesGetResponse> {
		const base = request.params.base;
		const basePerUsd = USD_RATES[base] ?? 1;
		const rates = Object.fromEntries(
			Object.entries(USD_RATES).map(([code, perUsd]) => [code, perUsd / basePerUsd])
		);

		return delay({
			base,
			rates,
			asOf: new Date().toISOString(),
		});
	}
}

export { FxMockRESTApiClient };
