import { pageFromMeta } from "@shared/api";
import { deliveryFromApi, deliveryQueryToApi } from "../mutators";
import type { Page, PageParams } from "@shared/api";
import type { DeliveryQuery, WebhookDelivery } from "@entity/configuration";
import type { IWebhookRESTApiClient } from "../rest-client";

interface ListDeliveriesRequest {
	handler: Pick<IWebhookRESTApiClient, 'listDeliveries'>;
	webhookId: string;
	query?: DeliveryQuery;
	page?: PageParams;
}

interface ListDeliveriesResponse {
	page: Page<WebhookDelivery>;
}

async function listDeliveries(request: ListDeliveriesRequest): Promise<ListDeliveriesResponse> {
	const response = await request.handler.listDeliveries({
		webhookId: request.webhookId,
		params: { ...deliveryQueryToApi(request.query), ...request.page },
	});

	return { page: pageFromMeta(response.data.map(deliveryFromApi), response.meta) };
}

export { listDeliveries };
export type { ListDeliveriesRequest, ListDeliveriesResponse };
