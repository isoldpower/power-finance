import type { IFxRESTApiClient, FxCurrency } from "../types.ts";

interface GetCurrenciesRequest {
	handler: Pick<IFxRESTApiClient, 'getCurrencies'>;
}

type GetCurrenciesResponse = FxCurrency[];

async function getCurrencies(request: GetCurrenciesRequest): Promise<GetCurrenciesResponse> {
	const response = await request.handler.getCurrencies();

	return response.currencies;
}

export { getCurrencies };
export type { GetCurrenciesRequest, GetCurrenciesResponse };
