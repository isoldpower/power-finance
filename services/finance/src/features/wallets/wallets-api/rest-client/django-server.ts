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
import type { WalletDetailed, WalletPreview } from "../types.ts";


const parseWalletPreview = (wallet: WalletPreview): WalletPreview => ({
	...wallet,
	balance: {
		...wallet.balance,
		amount: parseFloat(wallet.balance.amount as unknown as string),
	}
});

const parseWalletDetailed = (wallet: WalletDetailed): WalletDetailed => ({
	...wallet,
	balance: {
		...wallet.balance,
		amount: parseFloat(wallet.balance.amount as unknown as string),
	}
});

const serializeAmount = (amount: number): string => amount.toFixed(2);


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

		return this.axiosInstance.get<WalletDetailed>(`/${request.id}/${postfix}`)
			.then((response) => parseWalletDetailed(response.data));
	}

	public post(
		request: WalletPostRequest
	): Promise<WalletPostResponse> {
		const postfix = this.resolvePostfix(request.params);
		const data = {
			...request.data,
			balance: {
				...request.data.balance,
				amount: serializeAmount(request.data.balance.amount),
			}
		};

		return this.axiosInstance.post<WalletDetailed>(`/${postfix}`, data)
			.then((response) => parseWalletDetailed(response.data));
	}

	public list(
		request: WalletListRequest
	): Promise<WalletListResponse> {
		const postfix = this.resolvePostfix(request.params);

		return this.axiosInstance.get<WalletListResponse>(`/${postfix}`)
			.then((response) => ({
				...response.data,
				data: response.data.data.map(parseWalletPreview),
			}));
	}

	patch(
		request: WalletPatchRequest
	): Promise<WalletPatchResponse> {
		const postfix = this.resolvePostfix(request.params);
		const data = request.data.balance ? {
			...request.data,
			balance: {
				...request.data.balance,
				amount: serializeAmount(request.data.balance.amount),
			}
		} : request.data;

		return this.axiosInstance.patch<WalletDetailed>(`/${request.id}/${postfix}`, data)
			.then((response) => parseWalletDetailed(response.data));
	}

	put(
		request: WalletPutRequest
	): Promise<WalletPutResponse> {
		const postfix = this.resolvePostfix(request.params);
		const data = {
			...request.data,
			balance: {
				...request.data.balance,
				amount: serializeAmount(request.data.balance.amount),
			}
		};

		return this.axiosInstance.put<WalletDetailed>(`/${request.id}/${postfix}`, data)
			.then((response) => parseWalletDetailed(response.data));
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
