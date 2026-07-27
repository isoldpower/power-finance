import type { Account } from "@entity/accounts";
import type { IAccountsRESTApiClient } from "../rest-client";
import { accountPreviewToFlat } from "../mutators/api-to-flat.ts";


interface ListAccountsRequest {
	handler: Pick<IAccountsRESTApiClient, 'list'>;
}

interface ListAccountsResponse {
	data: Account[];
	meta: {
		limit: number
		offset: number
		total: number
	}
}

async function listAccounts(
	request: ListAccountsRequest
): Promise<ListAccountsResponse> {
	return request.handler.list({ params: {} }).then((response) => ({
		data: response.data.map(accountPreviewToFlat),
		meta: response.meta,
	}));
}

export { listAccounts };
export type { ListAccountsRequest, ListAccountsResponse };
