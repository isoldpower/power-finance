import type { IAutomationsRESTApiClient, AutomationUpdatePayload, AutomationUpdateResponse } from "../types.ts";

interface UpdateAutomationRequest {
	handler: Pick<IAutomationsRESTApiClient, 'update'>;
	id: string;
	data: AutomationUpdatePayload;
}

type UpdateAutomationResponse = AutomationUpdateResponse;

async function updateAutomation(request: UpdateAutomationRequest): Promise<UpdateAutomationResponse> {
	return request.handler.update({ id: request.id, data: request.data });
}

export { updateAutomation };
export type { UpdateAutomationRequest, UpdateAutomationResponse };
