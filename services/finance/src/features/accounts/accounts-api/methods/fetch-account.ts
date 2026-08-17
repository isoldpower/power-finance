import { pageFromMeta } from "@shared/api";
import { accountFromApi, ledgerEntryFromApi } from "../mutators";
import type { Page, PageParams } from "@shared/api";
import type { Account, LedgerEntry } from "@entity/accounts";
import type { IAccountsRESTApiClient } from "../rest-client";

interface FetchAccountRequest {
	handler: Pick<IAccountsRESTApiClient, 'get'>;
	id: string;
	page?: PageParams;
}

interface FetchAccountResponse {
	account: Account;
	history: Page<LedgerEntry>;
}

async function fetchAccount(request: FetchAccountRequest): Promise<FetchAccountResponse> {
	const response = await request.handler.get({ id: request.id, params: request.page });

	return {
		account: accountFromApi(response.data),
		history: pageFromMeta(response.data.history.map(ledgerEntryFromApi), response.meta.history),
	};
}

export { fetchAccount };
export type { FetchAccountRequest, FetchAccountResponse };
