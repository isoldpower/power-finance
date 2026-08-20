import { automationFromApi } from "../mutators";

import type { Automation } from "@entity/assistance";
import type { IAutomationsRESTApiClient } from "../rest-client";


interface DeleteAutomationRequest {
	handler: Pick<IAutomationsRESTApiClient, 'delete'>;
	id: string;
}

type DeleteAutomationResponse = Automation;

async function deleteAutomation(request: DeleteAutomationRequest): Promise<DeleteAutomationResponse> {
	const response = await request.handler.delete({ 
		id: request.id
	});

	return automationFromApi(response.data);
}

export { deleteAutomation };
export type { DeleteAutomationRequest, DeleteAutomationResponse };
