import { goalFromApi, goalPatchToApi } from "../mutators";

import type { Goal, GoalPatch } from "@entity/wallets";
import type { IGoalsRESTApiClient } from "../rest-client";


interface UpdateGoalRequest {
	handler: Pick<IGoalsRESTApiClient, 'patch'>;
	id: string;
	patch: GoalPatch;
}

type UpdateGoalResponse = Goal;

async function updateGoal(request: UpdateGoalRequest): Promise<UpdateGoalResponse> {
	const response = await request.handler.patch({
		id: request.id,
		data: goalPatchToApi(request.patch),
	});

	return goalFromApi(response.data);
}

export { updateGoal };
export type { UpdateGoalRequest, UpdateGoalResponse };
