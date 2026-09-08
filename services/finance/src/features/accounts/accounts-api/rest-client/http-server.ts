import { request, WriteVersionStore } from "@shared/api";
import type { AxiosInstance } from "axios";
import type {
	AccountGetRequest, AccountGetResponse,
	AccountListRequest, AccountListResponse,
	IAccountsRESTApiClient,
} from "./types.ts";


class AccountsHttpRESTApiClient implements IAccountsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public list(payload: AccountListRequest): Promise<AccountListResponse> {
		return request<AccountListResponse>(this.axiosInstance, {
			method: 'GET',
			url: '',
			params: { ...payload.params },
			headers: this.versions.headers(),
		}, this.versions);
	}

	public get(payload: AccountGetRequest): Promise<AccountGetResponse> {
		return request<AccountGetResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/${payload.id}`,
			params: { ...payload.params },
			headers: this.versions.headers(),
		}, this.versions);
	}
}

export { AccountsHttpRESTApiClient };
