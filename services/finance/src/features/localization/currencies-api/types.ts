interface FxRates {
	base: string;
	rates: Record<string, number>;
	asOf: string;
}

interface FxCurrency {
	code: string;
	symbol: string;
	name: string;
	decimals: number;
}

interface FxRatesGetRequest {
	params: {
		base: string;
	};
}

type FxRatesGetResponse = FxRates;

interface FxCurrenciesGetResponse {
	currencies: FxCurrency[];
}

interface IFxRESTApiClient {
	getRates: (request: FxRatesGetRequest) => Promise<FxRatesGetResponse>;
	getCurrencies: () => Promise<FxCurrenciesGetResponse>;
}

export type {
	FxRates,
	FxCurrency,
	FxRatesGetRequest,
	FxRatesGetResponse,
	FxCurrenciesGetResponse,
	IFxRESTApiClient,
};
