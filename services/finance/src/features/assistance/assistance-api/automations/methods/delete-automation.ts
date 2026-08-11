import type { IAutomationsRESTApiClient, AutomationDeleteResponse } from "../types.ts";

interface DeleteAutomationRequest {
	handler: Pick<IAutomationsRESTApiClient, 'delete'>;
	id: string;
}

type DeleteAutomationResponse = AutomationDeleteResponse;

async function deleteAutomation(request: DeleteAutomationRequest): Promise<DeleteAutomationResponse> {
	return request.handler.delete({ id: request.id });
}

export { deleteAutomation };
export type { DeleteAutomationRequest, DeleteAutomationResponse };
