import type { IAssistantRESTApiClient } from "../rest-client";


interface ClearAssistantMessagesRequest {
	handler: Pick<IAssistantRESTApiClient, 'clear'>;
}

interface ClearAssistantMessagesResponse {
	deleted: number;
}

async function clearAssistantMessages(
	request: ClearAssistantMessagesRequest
): Promise<ClearAssistantMessagesResponse> {
	const response = await request.handler.clear({});

	return { deleted: response.data.deleted };
}

export { clearAssistantMessages };
export type { ClearAssistantMessagesRequest, ClearAssistantMessagesResponse };
