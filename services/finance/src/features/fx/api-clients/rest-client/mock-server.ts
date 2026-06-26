import type {
	IFxRESTApiClient,
	FxRatesGetRequest,
	FxRatesGetResponse,
} from "../types.ts";

const MOCK_DELAY_MS = 250;

const delay = <T>(value: T): Promise<T> =>
	new Promise((resolve) => setTimeout(() => { resolve(value); }, MOCK_DELAY_MS));

// USD-based reference rates (units of currency per 1 USD).
const USD_RATES: Record<string, number> = {
	USD: 1,
	EUR: 0.92,
	GBP: 0.79,
	JPY: 156,
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
