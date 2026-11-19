import { dimensionsFromApi } from "../mutators";

import type { Dimensions } from "@entity/filters";
import type { ILedgerRESTApiClient } from "../rest-client";


interface GetDimensionsRequest {
	handler: Pick<ILedgerRESTApiClient, 'getDimensions'>;
	currency: string;
}

async function getDimensions(request: GetDimensionsRequest): Promise<Dimensions> {
	const response = await request.handler.getDimensions({ 
		params: {
			currency: request.currency
		}
	});

	return dimensionsFromApi(response.data);
}

export { getDimensions };
export type { GetDimensionsRequest };
