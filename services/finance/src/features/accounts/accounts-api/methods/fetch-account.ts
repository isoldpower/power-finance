import type { Account } from "@entity/accounts";
import type { IAccountsRESTApiClient } from "../rest-client";
import type { AccountGetRequest } from "../rest-client";
import { accountDetailedToFlat } from "../mutators/api-to-flat.ts";


interface FetchAccountRequest {
	handler: Pick<IAccountsRESTApiClient, 'get'>;
	payload: AccountGetRequest;
}

type FetchAccountResponse = Account & object;

async function fetchAccount(
	request: FetchAccountRequest
): Promise<FetchAccountResponse> {
	return request.handler.get(request.payload).then(accountDetailedToFlat);
}

export { fetchAccount };
export type { FetchAccountRequest, FetchAccountResponse };
