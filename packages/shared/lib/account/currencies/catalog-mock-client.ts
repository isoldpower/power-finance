import { delay, unpaginated } from "../../api/index.ts";
import { MOCK_CURRENCY_CATALOG } from "./catalog-seed.ts";

import type { CurrencyListResponse, ICurrencyCatalogRESTApiClient } from "./types.ts";


class CurrencyCatalogMockRESTApiClient implements ICurrencyCatalogRESTApiClient {
	public async list(): Promise<CurrencyListResponse> {
		await delay();
		const page = unpaginated([...MOCK_CURRENCY_CATALOG]);

		return { data: page.items, meta: { ...page.meta, cached: false } };
	}
}

export { CurrencyCatalogMockRESTApiClient };
