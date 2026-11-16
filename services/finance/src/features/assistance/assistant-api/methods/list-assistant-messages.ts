import { pageFromMeta } from "@internal/shared";
import type { Page, PageParams } from "@internal/shared";
import { assistantMessageFromApi } from "../mutators";

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
	const response = await request.handler.messages({ 
		params: request.page
	});

	const oldestFirst = [...response.data].reverse();

	return {
		page: pageFromMeta(
			oldestFirst.map(assistantMessageFromApi),
			response.meta,
		)
	};
}

export { listAssistantMessages };
export type { ListAssistantMessagesRequest, ListAssistantMessagesResponse };
