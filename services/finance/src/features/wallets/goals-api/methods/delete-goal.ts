import { goalFromApi } from "../mutators";

import type { Goal } from "@entity/wallets";
import type { IGoalsRESTApiClient } from "../rest-client";


interface DeleteGoalRequest {
	handler: Pick<IGoalsRESTApiClient, 'delete'>;
	id: string;
}

type DeleteGoalResponse = Goal;

async function deleteGoal(request: DeleteGoalRequest): Promise<DeleteGoalResponse> {
	const response = await request.handler.delete({ id: request.id });

	return goalFromApi(response.data);
}

export { deleteGoal };
export type { DeleteGoalRequest, DeleteGoalResponse };
