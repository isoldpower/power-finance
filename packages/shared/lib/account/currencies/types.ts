import type { CollectionResponse } from "../../api/index.ts";


interface CurrencyDto {
	code: string;
	symbol: string;
	name: string;
	decimals: number;
}

interface CurrencyListRequest {
	params?: object;
}

type CurrencyListResponse = CollectionResponse<CurrencyDto>;

interface ICurrencyCatalogRESTApiClient {
	list: (request: CurrencyListRequest) => Promise<CurrencyListResponse>;
}

export type { CurrencyDto, CurrencyListRequest, CurrencyListResponse, ICurrencyCatalogRESTApiClient };
