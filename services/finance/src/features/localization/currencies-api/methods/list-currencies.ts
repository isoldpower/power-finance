import { currencyFromApi } from "../mutators";

import type { CurrencyMeta } from "@entity/localization";
import type { ICurrenciesRESTApiClient } from "../rest-client";


interface ListCurrenciesRequest {
	handler: Pick<ICurrenciesRESTApiClient, 'list'>;
}

interface ListCurrenciesResponse {
	currencies: CurrencyMeta[];
}

async function listCurrencies(request: ListCurrenciesRequest): Promise<ListCurrenciesResponse> {
	const response = await request.handler.list({});

	return {
		currencies: response.data.map(currencyFromApi)
	};
}

export { listCurrencies };
export type { ListCurrenciesRequest, ListCurrenciesResponse };
