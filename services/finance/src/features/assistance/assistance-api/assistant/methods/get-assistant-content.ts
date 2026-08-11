import type { AssistantContentDto, IAssistantRESTApiClient } from "../types.ts";


interface GetAssistantContentRequest {
	handler: Pick<IAssistantRESTApiClient, 'getContent'>;
}

type GetAssistantContentResponse = AssistantContentDto;

async function getAssistantContent(
	request: GetAssistantContentRequest
): Promise<GetAssistantContentResponse> {
	return request.handler.getContent({ params: {} });
}

export { getAssistantContent };
export type { GetAssistantContentRequest, GetAssistantContentResponse };
