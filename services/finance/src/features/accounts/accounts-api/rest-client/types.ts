import type { ApiEnvelope, CollectionResponse, EmbeddedMeta, PageParams } from "@shared/api";
import type { AccountDetailDto, AccountDto, AccountListMeta, AccountListParams } from "../types.ts";

interface AccountListRequest {
	params?: AccountListParams;
}

type AccountListResponse = CollectionResponse<AccountDto, AccountListMeta>;

interface AccountGetRequest {
	id: string;
	params?: PageParams;
}

type AccountGetResponse = ApiEnvelope<AccountDetailDto, EmbeddedMeta<'history'>>;

interface IAccountsRESTApiClient {
	list: (request: AccountListRequest) => Promise<AccountListResponse>;
	get: (request: AccountGetRequest) => Promise<AccountGetResponse>;
}

export type { AccountGetRequest, AccountGetResponse, AccountListRequest, AccountListResponse, IAccountsRESTApiClient };
