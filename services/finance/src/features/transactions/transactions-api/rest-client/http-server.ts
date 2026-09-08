import { idempotencyHeaders, request, WriteVersionStore } from "@shared/api";

import { reportUnservedMethods } from "./unserved-methods.ts";
import { TransactionsMockRESTApiClient } from "./mock-server.ts";

import type { AxiosInstance } from "axios";
import type { UnservedTransactionMethods } from "./unserved-methods.ts";
import type {
	ITransactionsRESTApiClient,
	TransactionAdjustRequest, TransactionAdjustResponse,
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


const UNSERVED_METHODS = ['listCategories', 'scanReceipt'];

class TransactionsHttpRESTApiClient implements ITransactionsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;
	private readonly unserved: UnservedTransactionMethods;

	constructor(
		axiosInstance: AxiosInstance,
		versions = new WriteVersionStore(),
		unserved: UnservedTransactionMethods = new TransactionsMockRESTApiClient(),
	) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
		this.unserved = unserved;
		reportUnservedMethods(UNSERVED_METHODS);
	}

	public list(payload: TransactionListRequest): Promise<TransactionListResponse> {
		return request<TransactionListResponse>(this.axiosInstance, {
			method: 'GET',
			url: '',
			params: { ...payload.params },
			headers: this.versions.headers(),
		}, this.versions);
	}

	public get(payload: TransactionGetRequest): Promise<TransactionGetResponse> {
		return request<TransactionGetResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/${payload.id}`,
			params: { ...payload.params },
			headers: this.versions.headers(),
		}, this.versions);
	}

	public search(payload: TransactionSearchRequest): Promise<TransactionSearchResponse> {
		return request<TransactionSearchResponse>(this.axiosInstance, {
			method: 'POST',
			url: `/search`,
			params: { ...payload.params },
			data: payload.data,
			headers: this.versions.headers(),
		}, this.versions);
	}

	public post(payload: TransactionPostRequest): Promise<TransactionPostResponse> {
		return request<TransactionPostResponse>(this.axiosInstance, {
			method: 'POST',
			url: '',
			data: payload.data,
			headers: idempotencyHeaders(payload.idempotencyKey),
		}, this.versions);
	}

	public patch(payload: TransactionPatchRequest): Promise<TransactionPatchResponse> {
		return request<TransactionPatchResponse>(this.axiosInstance, {
			method: 'PATCH',
			url: `/${payload.id}`,
			data: payload.data,
		}, this.versions);
	}

	public adjust(payload: TransactionAdjustRequest): Promise<TransactionAdjustResponse> {
		return request<TransactionAdjustResponse>(this.axiosInstance, {
			method: 'POST',
			url: `/${payload.id}/adjust`,
			data: payload.data,
			headers: idempotencyHeaders(payload.idempotencyKey),
		}, this.versions);
	}

	public delete(payload: TransactionDeleteRequest): Promise<TransactionDeleteResponse> {
		return request<TransactionDeleteResponse>(this.axiosInstance, {
			method: 'DELETE',
			url: `/${payload.id}`,
		}, this.versions);
	}

	public postChain(payload: TransactionChainRequest): Promise<TransactionChainResponse> {
		return request<TransactionChainResponse>(this.axiosInstance, {
			method: 'POST',
			url: '/chains',
			data: payload.data,
			headers: idempotencyHeaders(payload.idempotencyKey),
		}, this.versions);
	}

	public deleteChain(payload: TransactionChainDeleteRequest): Promise<TransactionChainDeleteResponse> {
		return request<TransactionChainDeleteResponse>(this.axiosInstance, {
			method: 'DELETE',
			url: `/chains/${payload.chainId}`,
		}, this.versions);
	}

	public listCategories(payload: TransactionCategoriesRequest): Promise<TransactionCategoriesResponse> {
		return this.unserved.listCategories(payload);
	}

	public scanReceipt(payload: TransactionScanRequest): Promise<TransactionScanResponse> {
		return this.unserved.scanReceipt(payload);
	}
}

export { TransactionsHttpRESTApiClient };
