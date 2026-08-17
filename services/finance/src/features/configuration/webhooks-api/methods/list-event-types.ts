import { eventTypeFromApi } from "../mutators";

import type { WebhookEventType } from "@entity/configuration";
import type { IWebhookRESTApiClient } from "../rest-client";


interface ListEventTypesRequest {
	handler: Pick<IWebhookRESTApiClient, 'eventTypes'>;
}

interface ListEventTypesResponse {
	eventTypes: WebhookEventType[];
}

async function listEventTypes(request: ListEventTypesRequest): Promise<ListEventTypesResponse> {
	const response = await request.handler.eventTypes({});

	return { 
		eventTypes: response.data.map(eventTypeFromApi)
	};
}

export { listEventTypes };
export type { ListEventTypesRequest, ListEventTypesResponse };
