import { pageFromMeta } from "@internal/shared";
import type { Page, PageParams } from "@internal/shared";
import { deliveryFromApi, deliveryQueryToApi } from "../mutators";

import type { DeliveryQuery, WebhookDelivery } from "@entity/configuration";
import type { IWebhooksRESTApiClient } from "../rest-client";


interface ListDeliveriesRequest {
	handler: Pick<IWebhooksRESTApiClient, 'listDeliveries'>;
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
		params: { 
			...deliveryQueryToApi(request.query), 
			...request.page,
		},
	});

	return { 
		page: pageFromMeta(
			response.data.map(deliveryFromApi),
			response.meta,
		)
	};
}

export { listDeliveries };
export type { ListDeliveriesRequest, ListDeliveriesResponse };
