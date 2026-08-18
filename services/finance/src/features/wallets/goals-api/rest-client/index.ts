export { GoalsDjangoRESTApiClient } from './django-server.ts';
export { GoalsMockRESTApiClient } from './mock-server.ts';
export { GOALS_STORAGE_KEY } from './mock-seed.ts';

export type {
	IGoalsRESTApiClient,
	GoalDeleteRequest,
	GoalDeleteResponse,
	GoalGetRequest,
	GoalGetResponse,
	GoalListRequest,
	GoalListResponse,
	GoalPatchRequest,
	GoalPatchResponse,
	GoalPostRequest,
	GoalPostResponse,
} from './types.ts';
export type { StoredGoal } from './mock-seed.ts';
