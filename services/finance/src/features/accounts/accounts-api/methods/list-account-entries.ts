import type { LedgerEntryDto } from "@entity/accounts";
import type { IAccountsRESTApiClient } from "../rest-client";
import type { AccountEntriesRequest } from "../rest-client/types.ts";
import { ledgerEntryToFlat } from "../mutators/api-to-flat.ts";


interface ListAccountEntriesRequest {
	handler: Pick<IAccountsRESTApiClient, 'listEntries'>;
	payload: AccountEntriesRequest;
}

interface ListAccountEntriesResponse {
	data: LedgerEntryDto[];
	meta: {
		limit: number
		offset: number
		total: number
	}
}

async function listAccountEntries(
	request: ListAccountEntriesRequest
): Promise<ListAccountEntriesResponse> {
	return request.handler.listEntries(request.payload).then((response) => ({
		data: response.data.map(ledgerEntryToFlat),
		meta: response.meta,
	}));
}

export { listAccountEntries };
export type { ListAccountEntriesRequest, ListAccountEntriesResponse };
