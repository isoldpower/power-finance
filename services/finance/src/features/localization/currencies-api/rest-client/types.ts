import type { ApiEnvelope, CacheMeta, CollectionResponse } from "@shared/api";
import type {
	CurrencyConversionDto,
	CurrencyConvertParams,
	CurrencyDto,
	CurrencyRatesDto,
	CurrencyRatesParams,
} from "../types.ts";

interface CurrencyListRequest {
	params?: object;
}

type CurrencyListResponse = CollectionResponse<CurrencyDto>;

interface CurrencyConvertRequest {
	params: CurrencyConvertParams;
}

type CurrencyConvertResponse = ApiEnvelope<CurrencyConversionDto, CacheMeta & { fetched_at: string }>;

interface CurrencyRatesRequest {
	code: string;
	params?: CurrencyRatesParams;
}

type CurrencyRatesResponse = ApiEnvelope<CurrencyRatesDto, CacheMeta & {
	fetched_at: string;
	target: string[] | null;
}>;

interface ICurrenciesRESTApiClient {
	list: (request: CurrencyListRequest) => Promise<CurrencyListResponse>;
	convert: (request: CurrencyConvertRequest) => Promise<CurrencyConvertResponse>;
	rates: (request: CurrencyRatesRequest) => Promise<CurrencyRatesResponse>;
}

export type {
	CurrencyConvertRequest,
	CurrencyConvertResponse,
	CurrencyListRequest,
	CurrencyListResponse,
	CurrencyRatesRequest,
	CurrencyRatesResponse,
	ICurrenciesRESTApiClient,
};
