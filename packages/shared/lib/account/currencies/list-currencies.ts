import { currencyFromApi } from "./mappers.ts";

import type { CurrencyMeta } from "../types.ts";
import type { ICurrencyCatalogRESTApiClient } from "./types.ts";


interface ListCurrenciesRequest {
	handler: Pick<ICurrencyCatalogRESTApiClient, 'list'>;
}

interface ListCurrenciesResponse {
	currencies: CurrencyMeta[];
}

async function listCurrencies(request: ListCurrenciesRequest): Promise<ListCurrenciesResponse> {
	const response = await request.handler.list({});

	return {
		currencies: response.data.map(currencyFromApi),
	};
}

export { listCurrencies };
export type { ListCurrenciesRequest, ListCurrenciesResponse };
