import { analyticsParamsToApi } from "@feature/filters/ledger-api";
import { spendingCalendarFromApi } from "../mutators";

import type { AnalyticsQuery } from "@entity/filters";
import type { SpendingCalendar } from "@entity/spending";
import type { IPatternsRESTApiClient } from "../rest-client";


interface GetSpendingCalendarRequest {
	handler: Pick<IPatternsRESTApiClient, 'getCalendar'>;
	query: AnalyticsQuery;
}

async function getSpendingCalendar(request: GetSpendingCalendarRequest): Promise<SpendingCalendar> {
	const response = await request.handler.getCalendar({ params: analyticsParamsToApi(request.query) });

	return spendingCalendarFromApi(response.data);
}

export { getSpendingCalendar };
export type { GetSpendingCalendarRequest };
