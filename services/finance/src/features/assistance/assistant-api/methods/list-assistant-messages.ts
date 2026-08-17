import { pageFromMeta } from "@shared/api";
import { assistantMessageFromApi } from "../mutators";
import type { Page, PageParams } from "@shared/api";
import type { AssistantMessage } from "@entity/assistance";
import type { IAssistantRESTApiClient } from "../rest-client";

interface ListAssistantMessagesRequest {
	handler: Pick<IAssistantRESTApiClient, 'messages'>;
	page?: PageParams;
}

interface ListAssistantMessagesResponse {
	page: Page<AssistantMessage>;
}

async function listAssistantMessages(
	request: ListAssistantMessagesRequest
): Promise<ListAssistantMessagesResponse> {
	const response = await request.handler.messages({ params: request.page });

	return { page: pageFromMeta(response.data.map(assistantMessageFromApi), response.meta) };
}

export { listAssistantMessages };
export type { ListAssistantMessagesRequest, ListAssistantMessagesResponse };
