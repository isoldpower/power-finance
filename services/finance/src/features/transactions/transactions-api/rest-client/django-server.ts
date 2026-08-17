import { buildQuery, idempotencyHeaders, request, WriteVersionStore } from "@shared/api";

import type { AxiosInstance } from "axios";
import type {
	ITransactionsRESTApiClient,
	TransactionCategoriesRequest, TransactionCategoriesResponse,
	TransactionChainDeleteRequest, TransactionChainDeleteResponse,
	TransactionChainRequest, TransactionChainResponse,
	TransactionDeleteRequest, TransactionDeleteResponse,
	TransactionGetRequest, TransactionGetResponse,
	TransactionListRequest, TransactionListResponse,
	TransactionPatchRequest, TransactionPatchResponse,
	TransactionPostRequest, TransactionPostResponse,
	TransactionScanRequest, TransactionScanResponse,
	TransactionSearchRequest, TransactionSearchResponse,
} from "./types.ts";


class TransactionsDjangoRESTApiClient implements ITransactionsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public list(payload: TransactionListRequest): Promise<TransactionListResponse> {
		return request<TransactionListResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/${buildQuery({ ...payload.params })}`,
			headers: this.versions.headers(),
		}, this.versions);
	}

	public get(payload: TransactionGetRequest): Promise<TransactionGetResponse> {
		return request<TransactionGetResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/${payload.id}/${buildQuery({ ...payload.params })}`,
			headers: this.versions.headers(),
		}, this.versions);
	}

	public search(payload: TransactionSearchRequest): Promise<TransactionSearchResponse> {
		return request<TransactionSearchResponse>(this.axiosInstance, {
			method: 'POST',
			url: `/search/${buildQuery({ ...payload.params })}`,
			data: payload.data,
			headers: this.versions.headers(),
		}, this.versions);
	}

	public post(payload: TransactionPostRequest): Promise<TransactionPostResponse> {
		return request<TransactionPostResponse>(this.axiosInstance, {
			method: 'POST',
			url: '/',
			data: payload.data,
			headers: idempotencyHeaders(payload.idempotencyKey),
		}, this.versions);
	}

	public patch(payload: TransactionPatchRequest): Promise<TransactionPatchResponse> {
		return request<TransactionPatchResponse>(this.axiosInstance, {
			method: 'PATCH',
			url: `/${payload.id}/`,
			data: payload.data,
		}, this.versions);
	}

	public delete(payload: TransactionDeleteRequest): Promise<TransactionDeleteResponse> {
		return request<TransactionDeleteResponse>(this.axiosInstance, {
			method: 'DELETE',
			url: `/${payload.id}/`,
		}, this.versions);
	}

	public postChain(payload: TransactionChainRequest): Promise<TransactionChainResponse> {
		return request<TransactionChainResponse>(this.axiosInstance, {
			method: 'POST',
			url: '/chains/',
			data: payload.data,
			headers: idempotencyHeaders(payload.idempotencyKey),
		}, this.versions);
	}

	public deleteChain(payload: TransactionChainDeleteRequest): Promise<TransactionChainDeleteResponse> {
		return request<TransactionChainDeleteResponse>(this.axiosInstance, {
			method: 'DELETE',
			url: `/chains/${payload.chainId}/`,
		}, this.versions);
	}

	public listCategories(payload: TransactionCategoriesRequest): Promise<TransactionCategoriesResponse> {
		return request<TransactionCategoriesResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/categories/${buildQuery({ ...payload.params })}`,
			headers: this.versions.headers(),
		}, this.versions);
	}

	public scanReceipt(payload: TransactionScanRequest): Promise<TransactionScanResponse> {
		return request<TransactionScanResponse>(this.axiosInstance, {
			method: 'POST',
			url: '/scan/',
			data: payload.params,
		}, this.versions);
	}
}

export { TransactionsDjangoRESTApiClient };
