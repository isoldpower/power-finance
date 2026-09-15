export { AutomationsHttpRESTApiClient } from './http-server.ts';
export { AutomationsMockRESTApiClient, AUTOMATION_SEARCH_FIELDS } from './mock-server.ts';
export { AUTOMATIONS_STORAGE_KEY } from './mock-seed.ts';

export type {
	IAutomationsRESTApiClient,
	AutomationDeleteRequest,
	AutomationDeleteResponse,
	AutomationGetRequest,
	AutomationGetResponse,
	AutomationListRequest,
	AutomationListResponse,
	AutomationPatchRequest,
	AutomationPatchResponse,
	AutomationPostRequest,
	AutomationPostResponse,
	AutomationSearchRequest,
	AutomationSearchResponse,
} from './types.ts';
export type { StoredAutomation } from './mock-seed.ts';
