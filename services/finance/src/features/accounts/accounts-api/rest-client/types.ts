import type {
	GetRequest, GetResponse, IGetHandler,
	ListParams, ListRequest, ListResponse, IListHandler,
} from "@internal/shared";
import type { AccountPreview, AccountDetailed, LedgerEntry } from "../types.ts";


interface AccountEntriesRequest {
	id: string
	params?: ListParams
}

type AccountEntriesResponse = ListResponse<LedgerEntry>;

interface IAccountsRESTApiClient extends
	IGetHandler<object, AccountDetailed>,
	IListHandler<AccountPreview>
{
	listEntries: (request: AccountEntriesRequest) => Promise<AccountEntriesResponse>
}

type AccountGetRequest = GetRequest<object>;
type AccountGetResponse = GetResponse<AccountDetailed>;

type AccountListRequest = ListRequest;
type AccountListResponse = ListResponse<AccountPreview>;

export type { AccountGetRequest, AccountGetResponse };
export type { AccountListRequest, AccountListResponse };
export type { AccountEntriesRequest, AccountEntriesResponse };
export type { IAccountsRESTApiClient };
