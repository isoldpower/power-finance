import type {
	IListHandler,
	ListRequest,
	ListResponse,
	DeleteResponse,
} from "@internal/shared";

type AutomationStatusTone = 'pos' | 'warn' | 'neutral';

interface AutomationRule {
	id: string;
	icon: string;
	name: string;
	trigger: string;
	action: string;
	frequency: string;
	enabled: boolean;
}

interface AutomationListParams {
	enabled?: boolean;
	limit?: number;
	cursor?: string;
}

type AutomationListRequest = ListRequest<AutomationListParams>;
type AutomationListResponse = ListResponse<AutomationRule>;

interface AutomationGetRequest {
	id: string;
}

interface AutomationGetResponse {
	data: AutomationRule;
}

interface AutomationToggleRequest {
	id: string;
	enabled: boolean;
}

interface AutomationToggleResponse {
	data: AutomationRule;
}

interface AutomationCreatePayload {
	name: string;
	trigger: string;
	action: string;
	frequency: string;
	icon?: string;
}

interface AutomationCreateRequest {
	data: AutomationCreatePayload;
}

interface AutomationCreateResponse {
	data: AutomationRule;
}

interface AutomationUpdatePayload {
	name?: string;
	trigger?: string;
	action?: string;
	frequency?: string;
	icon?: string;
}

interface AutomationUpdateRequest {
	id: string;
	data: AutomationUpdatePayload;
}

interface AutomationUpdateResponse {
	data: AutomationRule;
}

interface AutomationDeleteRequest {
	id: string;
}

type AutomationDeleteResponse = DeleteResponse;

interface IAutomationsRESTApiClient extends IListHandler<AutomationRule, AutomationListParams> {
	get: (request: AutomationGetRequest) => Promise<AutomationGetResponse>;
	toggle: (request: AutomationToggleRequest) => Promise<AutomationToggleResponse>;
	create: (request: AutomationCreateRequest) => Promise<AutomationCreateResponse>;
	update: (request: AutomationUpdateRequest) => Promise<AutomationUpdateResponse>;
	delete: (request: AutomationDeleteRequest) => Promise<AutomationDeleteResponse>;
}

export type {
	AutomationRule,
	AutomationStatusTone,
	AutomationListParams,
	AutomationListRequest,
	AutomationListResponse,
	AutomationGetRequest,
	AutomationGetResponse,
	AutomationToggleRequest,
	AutomationToggleResponse,
	AutomationCreatePayload,
	AutomationCreateRequest,
	AutomationCreateResponse,
	AutomationUpdatePayload,
	AutomationUpdateRequest,
	AutomationUpdateResponse,
	AutomationDeleteRequest,
	AutomationDeleteResponse,
	IAutomationsRESTApiClient,
};
