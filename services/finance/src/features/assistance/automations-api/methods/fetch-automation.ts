import { automationFromApi } from "../mutators";
import type { Automation } from "@entity/assistance";
import type { IAutomationsRESTApiClient } from "../rest-client";

interface FetchAutomationRequest {
	handler: Pick<IAutomationsRESTApiClient, 'get'>;
	id: string;
}

type FetchAutomationResponse = Automation;

async function fetchAutomation(request: FetchAutomationRequest): Promise<FetchAutomationResponse> {
	const response = await request.handler.get({ id: request.id });

	return automationFromApi(response.data);
}

export { fetchAutomation };
export type { FetchAutomationRequest, FetchAutomationResponse };
