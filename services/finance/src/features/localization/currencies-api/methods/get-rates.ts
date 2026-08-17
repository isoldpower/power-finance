import { ratesFromApi } from "../mutators";

import type { CurrencyRates } from "@entity/localization";
import type { ICurrenciesRESTApiClient } from "../rest-client";


interface GetRatesRequest {
	handler: Pick<ICurrenciesRESTApiClient, 'rates'>;
	base: string;
	target?: string[];
}

type GetRatesResponse = CurrencyRates;

async function getRates(request: GetRatesRequest): Promise<GetRatesResponse> {
	const response = await request.handler.rates({
		code: request.base,
		params: { 
			target: request.target
		},
	});

	return ratesFromApi(response.data, response.meta.fetched_at);
}

export { getRates };
export type { GetRatesRequest, GetRatesResponse };
