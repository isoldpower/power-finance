interface FxRates {
	base: string;
	rates: Record<string, number>;
	asOf: string;
}

interface FxRatesGetRequest {
	params: {
		base: string;
	};
}

type FxRatesGetResponse = FxRates;

interface IFxRESTApiClient {
	getRates: (request: FxRatesGetRequest) => Promise<FxRatesGetResponse>;
}

export type {
	FxRates,
	FxRatesGetRequest,
	FxRatesGetResponse,
	IFxRESTApiClient,
};
