import type { IAutomationsRESTApiClient, AutomationToggleResponse } from "../types.ts";

interface ToggleAutomationRequest {
	handler: Pick<IAutomationsRESTApiClient, 'toggle'>;
	id: string;
	enabled: boolean;
}

type ToggleAutomationResponse = AutomationToggleResponse;

async function toggleAutomation(request: ToggleAutomationRequest): Promise<ToggleAutomationResponse> {
	return request.handler.toggle({ id: request.id, enabled: request.enabled });
}

export { toggleAutomation };
export type { ToggleAutomationRequest, ToggleAutomationResponse };
