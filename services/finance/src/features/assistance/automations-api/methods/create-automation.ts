import { automationDraftToApi, automationFromApi } from "../mutators";
import type { Automation, AutomationDraft } from "@entity/assistance";
import type { IAutomationsRESTApiClient } from "../rest-client";

interface CreateAutomationRequest {
	handler: Pick<IAutomationsRESTApiClient, 'post'>;
	draft: AutomationDraft;
	idempotencyKey?: string;
}

interface CreateAutomationResponse {
	automation: Automation;
	replayed: boolean;
}

async function createAutomation(request: CreateAutomationRequest): Promise<CreateAutomationResponse> {
	const response = await request.handler.post({
		data: automationDraftToApi(request.draft),
		idempotencyKey: request.idempotencyKey,
	});

	return {
		automation: automationFromApi(response.data),
		replayed: response.meta.idempotent_replay ?? false,
	};
}

export { createAutomation };
export type { CreateAutomationRequest, CreateAutomationResponse };
