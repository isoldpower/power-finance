import {
	IWalletsRESTApiClient,
	WalletDeleteRequest,
	WalletDeleteResponse,
	WalletGetRequest,
	WalletGetResponse,
	WalletListRequest,
	WalletListResponse,
	WalletPatchRequest,
	WalletPatchResponse,
	WalletPostRequest,
	WalletPostResponse,
	WalletPutRequest,
	WalletPutResponse
} from "./types.ts";
import { AxiosInstance } from "axios";


class WalletsDjangoRESTApiClient implements IWalletsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;

	constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
	}
	
	private resolvePostfix(params: object | undefined): string {
		let requestPostfix = '';
		if (params && Object.keys(params).length > 0) {
			const urlParams = new URLSearchParams(Object.entries(params));
			requestPostfix = `?${urlParams.toString()}`;
		}
		
		return requestPostfix;
	}

	public get(
		request: WalletGetRequest
	): Promise<WalletGetResponse> {
		const postfix = this.resolvePostfix(request.params);
		
		return this.axiosInstance.get<WalletGetResponse>(`/${request.id}/${postfix}`)
			.then((response) => response.data);
	}

	public post(
		request: WalletPostRequest
	): Promise<WalletPostResponse> {
		const postfix = this.resolvePostfix(request.params);
		
		return this.axiosInstance.post<WalletPostResponse>(`/${postfix}`, request.data)
			.then((response) => response.data);
	}

	public list(
		request: WalletListRequest
	): Promise<WalletListResponse> {
		const postfix = this.resolvePostfix(request.params);
		
		return this.axiosInstance.get<WalletListResponse>(`/${postfix}`)
			.then((response) => response.data);
	}

	patch(
		request: WalletPatchRequest
	): Promise<WalletPatchResponse> {
		const postfix = this.resolvePostfix(request.params);
		
		return this.axiosInstance.patch<WalletPatchResponse>(`/${request.id}/${postfix}`, request.data)
			.then((response) => response.data);
	}

	put(
		request: WalletPutRequest
	): Promise<WalletPutResponse> {
		const postfix = this.resolvePostfix(request.params);
		
		return this.axiosInstance.put<WalletPutResponse>(`/${postfix}`, request.data)
			.then((response) => response.data);
	}

	delete(
		request: WalletDeleteRequest
	): Promise<WalletDeleteResponse> {
		const postfix = this.resolvePostfix(request.params);
		
		return this.axiosInstance.delete<WalletDeleteResponse>(`/${request.id}/${postfix}`)
			.then((response) => response.data);
	}
}

export { WalletsDjangoRESTApiClient };
