export { AutomationsDjangoRESTApiClient } from './django-server.ts';
export { AutomationsMockRESTApiClient } from './mock-server.ts';
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
} from './types.ts';
export type { StoredAutomation } from './mock-seed.ts';
