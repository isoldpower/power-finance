import { automationFromApi, automationPatchToApi } from "../mutators";
import type { Automation, AutomationPatch } from "@entity/assistance";
import type { IAutomationsRESTApiClient } from "../rest-client";

interface UpdateAutomationRequest {
	handler: Pick<IAutomationsRESTApiClient, 'patch'>;
	id: string;
	patch: AutomationPatch;
}

type UpdateAutomationResponse = Automation;

async function updateAutomation(request: UpdateAutomationRequest): Promise<UpdateAutomationResponse> {
	const response = await request.handler.patch({
		id: request.id,
		data: automationPatchToApi(request.patch),
	});

	return automationFromApi(response.data);
}

export { updateAutomation };
export type { UpdateAutomationRequest, UpdateAutomationResponse };
