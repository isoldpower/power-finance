import { idempotencyHeaders, request, WriteVersionStore } from "@shared/api";

import type { AxiosInstance } from "axios";
import type {
	IWalletsRESTApiClient,
	WalletDeleteRequest, WalletDeleteResponse,
	WalletGetRequest, WalletGetResponse,
	WalletListRequest, WalletListResponse,
	WalletPatchRequest, WalletPatchResponse,
	WalletPostRequest, WalletPostResponse,
	WalletPutRequest, WalletPutResponse,
	WalletSearchRequest, WalletSearchResponse,
} from "./types.ts";


class WalletsHttpRESTApiClient implements IWalletsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public list(payload: WalletListRequest): Promise<WalletListResponse> {
		return request<WalletListResponse>(this.axiosInstance, {
			method: 'GET',
			url: '',
			params: { ...payload.params },
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}

	public get(payload: WalletGetRequest): Promise<WalletGetResponse> {
		return request<WalletGetResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/${payload.id}`,
			params: { ...payload.params },
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}

	public post(payload: WalletPostRequest): Promise<WalletPostResponse> {
		return request<WalletPostResponse>(this.axiosInstance, {
			method: 'POST',
			url: '',
			data: payload.data,
			headers: idempotencyHeaders(payload.idempotencyKey),
		}, this.versions);
	}

	public put(payload: WalletPutRequest): Promise<WalletPutResponse> {
		return request<WalletPutResponse>(this.axiosInstance, {
			method: 'PUT',
			url: `/${payload.id}`,
			data: payload.data,
		}, this.versions);
	}

	public patch(payload: WalletPatchRequest): Promise<WalletPatchResponse> {
		return request<WalletPatchResponse>(this.axiosInstance, {
			method: 'PATCH',
			url: `/${payload.id}`,
			data: payload.data,
		}, this.versions);
	}

	public delete(payload: WalletDeleteRequest): Promise<WalletDeleteResponse> {
		return request<WalletDeleteResponse>(this.axiosInstance, {
			method: 'DELETE',
			url: `/${payload.id}`,
		}, this.versions);
	}

	public search(payload: WalletSearchRequest): Promise<WalletSearchResponse> {
		return request<WalletSearchResponse>(this.axiosInstance, {
			method: 'POST',
			url: `/search`,
			params: { ...payload.params },
			data: payload.data,
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}
}

export { WalletsHttpRESTApiClient };
