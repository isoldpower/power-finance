import { netWorthFromApi } from "../mutators";

import type { NetWorth } from "@entity/metrics";
import type { IMetricsRESTApiClient } from "../rest-client";


interface GetNetWorthRequest {
	handler: Pick<IMetricsRESTApiClient, 'netWorth'>;
	since?: string;
	points?: number;
}

type GetNetWorthResponse = NetWorth;

async function getNetWorth(request: GetNetWorthRequest): Promise<GetNetWorthResponse> {
	const response = await request.handler.netWorth({
		params: { 
			since: request.since,
			points: request.points,
		},
	});

	return netWorthFromApi(response.data);
}

export { getNetWorth };
export type { GetNetWorthRequest, GetNetWorthResponse };
