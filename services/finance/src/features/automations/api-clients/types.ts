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
	statusText: string;
	statusTone: AutomationStatusTone;
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

interface AutomationDeleteRequest {
	id: string;
}

type AutomationDeleteResponse = DeleteResponse;

interface IAutomationsRESTApiClient extends IListHandler<AutomationRule, AutomationListParams> {
	toggle: (request: AutomationToggleRequest) => Promise<AutomationToggleResponse>;
	create: (request: AutomationCreateRequest) => Promise<AutomationCreateResponse>;
	delete: (request: AutomationDeleteRequest) => Promise<AutomationDeleteResponse>;
}

export type {
	AutomationRule,
	AutomationStatusTone,
	AutomationListParams,
	AutomationListRequest,
	AutomationListResponse,
	AutomationToggleRequest,
	AutomationToggleResponse,
	AutomationCreatePayload,
	AutomationCreateRequest,
	AutomationCreateResponse,
	AutomationDeleteRequest,
	AutomationDeleteResponse,
	IAutomationsRESTApiClient,
};
