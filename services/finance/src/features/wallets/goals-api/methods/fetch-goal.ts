import { pageFromMeta } from "@shared/api";
import { ledgerEntryFromApi } from "@feature/accounts/accounts-api";
import { goalFromApi } from "../mutators";
import type { Page, PageParams } from "@shared/api";
import type { LedgerEntry } from "@entity/accounts";
import type { Goal } from "@entity/wallets";
import type { IGoalsRESTApiClient } from "../rest-client";

interface FetchGoalRequest {
	handler: Pick<IGoalsRESTApiClient, 'get'>;
	id: string;
	page?: PageParams;
}

interface FetchGoalResponse {
	goal: Goal;
	history: Page<LedgerEntry>;
}

async function fetchGoal(request: FetchGoalRequest): Promise<FetchGoalResponse> {
	const response = await request.handler.get({ id: request.id, params: request.page });

	return {
		goal: goalFromApi(response.data),
		history: pageFromMeta(response.data.history.map(ledgerEntryFromApi), response.meta.history),
	};
}

export { fetchGoal };
export type { FetchGoalRequest, FetchGoalResponse };
