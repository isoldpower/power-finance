import type { IAutomationsRESTApiClient, AutomationCreatePayload, AutomationCreateResponse } from "../types.ts";

interface CreateAutomationRequest {
	handler: Pick<IAutomationsRESTApiClient, 'create'>;
	data: AutomationCreatePayload;
}

type CreateAutomationResponse = AutomationCreateResponse;

async function createAutomation(request: CreateAutomationRequest): Promise<CreateAutomationResponse> {
	return request.handler.create({ data: request.data });
}

export { createAutomation };
export type { CreateAutomationRequest, CreateAutomationResponse };
