import type { IAutomationsRESTApiClient, AutomationGetResponse } from "../types.ts";

interface FetchAutomationRequest {
	handler: Pick<IAutomationsRESTApiClient, 'get'>;
	id: string;
}

type FetchAutomationResponse = AutomationGetResponse;

async function fetchAutomation(request: FetchAutomationRequest): Promise<FetchAutomationResponse> {
	return request.handler.get({ id: request.id });
}

export { fetchAutomation };
export type { FetchAutomationRequest, FetchAutomationResponse };
