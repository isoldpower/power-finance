import type { IFxRESTApiClient, FxRates } from "../types.ts";

interface GetRatesRequest {
	handler: Pick<IFxRESTApiClient, 'getRates'>;
	base: string;
}

type GetRatesResponse = FxRates;

async function getRates(request: GetRatesRequest): Promise<GetRatesResponse> {
	return request.handler.getRates({ params: { base: request.base } });
}

export { getRates };
export type { GetRatesRequest, GetRatesResponse };
