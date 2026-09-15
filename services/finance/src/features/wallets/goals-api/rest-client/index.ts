export { GoalsHttpRESTApiClient } from './http-server.ts';
export { GoalsMockRESTApiClient, GOAL_SEARCH_FIELDS } from './mock-server.ts';
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
	GoalSearchRequest,
	GoalSearchResponse,
} from './types.ts';
export type { StoredGoal } from './mock-seed.ts';
