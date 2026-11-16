import { analyticsParamsToApi } from "@feature/filters/ledger-api";
import { spendingRhythmFromApi } from "../mutators";

import type { AnalyticsQuery, LedgerSide } from "@entity/filters";
import type { SpendingRhythm } from "@entity/spending";
import type { IPatternsRESTApiClient } from "../rest-client";


interface GetSpendingRhythmRequest {
	handler: Pick<IPatternsRESTApiClient, 'getRhythm'>;
	query: AnalyticsQuery;
	side: LedgerSide;
}

async function getSpendingRhythm(request: GetSpendingRhythmRequest): Promise<SpendingRhythm> {
	const response = await request.handler.getRhythm({
		params: { ...analyticsParamsToApi(request.query), type: request.side },
	});

	return spendingRhythmFromApi(response.data);
}

export { getSpendingRhythm };
export type { GetSpendingRhythmRequest };
