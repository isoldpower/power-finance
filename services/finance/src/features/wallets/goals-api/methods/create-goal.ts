import { goalDraftToApi, goalFromApi } from "../mutators";

import type { Goal, GoalDraft } from "@entity/wallets";
import type { IGoalsRESTApiClient } from "../rest-client";


interface CreateGoalRequest {
	handler: Pick<IGoalsRESTApiClient, 'post'>;
	draft: GoalDraft;
	idempotencyKey?: string;
}

interface CreateGoalResponse {
	goal: Goal;
	replayed: boolean;
}

async function createGoal(request: CreateGoalRequest): Promise<CreateGoalResponse> {
	const response = await request.handler.post({
		data: goalDraftToApi(request.draft),
		idempotencyKey: request.idempotencyKey,
	});

	return {
		goal: goalFromApi(response.data),
		replayed: response.meta.idempotent_replay ?? false,
	};
}

export { createGoal };
export type { CreateGoalRequest, CreateGoalResponse };
