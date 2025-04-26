import { v4 as uuidv4 } from "uuid";

import type { Wallet } from "@entity/wallet";
import type { IStorage } from "@app/api";
import { LocalStorageMock } from "@app/api";

import { flatToWalletDetailed, flatToWalletPreview } from "../mutators/flat-to-api.ts";
import {
	IWalletsRESTApiClient,
	WalletDeleteRequest, WalletDeleteResponse,
	WalletGetRequest, WalletGetResponse,
	WalletListRequest, WalletListResponse,
	WalletPatchRequest, WalletPatchResponse,
	WalletPostRequest, WalletPostResponse,
	WalletPutRequest, WalletPutResponse
} from "./types.ts";


class WalletsMockRESTApiClient implements IWalletsRESTApiClient {
	private readonly storage: IStorage<Wallet>;

	constructor() {
		this.storage = new LocalStorageMock<Wallet>("wallets");
	}

	public get(
		request: WalletGetRequest
	): Promise<WalletGetResponse> {
		return new Promise((resolve) => setTimeout(resolve, 1000))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) return Promise.reject(new Error("Not found"));

				return flatToWalletDetailed(value);
			});
	}

	public post(
		request: WalletPostRequest
	): Promise<WalletPostResponse> {
		const timestamp = new Date().toISOString();
		const filledPayload: Wallet = Object.assign(request.data, {
			id: uuidv4(),
			createdAt: timestamp,
			updatedAt: timestamp,
		});

		return new Promise((resolve) => setTimeout(resolve, 1000))
			.then(() => this.storage.add(filledPayload))
			.then(() => flatToWalletDetailed(filledPayload));
	}

	public list(
		request: WalletListRequest
	): Promise<WalletListResponse> {
		const items = this.storage.list();
		const start = request.params?.offset ?? 0;
		const end = request.params?.limit
			? start + request.params.limit
			: items.length;

		return new Promise((resolve) => setTimeout(resolve, 1000))
			.then(() => items.slice(start, end))
			.then((values) => ({
				data: values.map(flatToWalletPreview),
				meta: {
					total: items.length,
					offset: request.params?.offset ?? 0,
					limit: end - start,
				}
			}));
	}

	patch(
		request: WalletPatchRequest
	): Promise<WalletPatchResponse> {
		return new Promise((resolve) => setTimeout(resolve, 1000))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) return Promise.reject(new Error("Not found"));

				this.storage.remove(value);
				const updatedValue = Object.assign(value, request.data);
				this.storage.add(updatedValue);
				return flatToWalletDetailed(updatedValue);
			});
	}

	put(
		request: WalletPutRequest
	): Promise<WalletPutResponse> {
		return new Promise((resolve) => setTimeout(resolve, 1000))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) return Promise.reject(new Error("Not found"));

				this.storage.remove(value);
				const updatedValue: Wallet = Object.assign({ id: value.id }, request.data);
				this.storage.add(updatedValue);
				return flatToWalletDetailed(updatedValue);
			});
	}

	delete(
		request: WalletDeleteRequest
	): Promise<WalletDeleteResponse> {
		return new Promise((resolve) => setTimeout(resolve, 1000))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) return Promise.reject(new Error("Not found"));

				this.storage.remove(value);
				return {
					message: `Successfully deleted resource at ${request.id}`,
					meta: {
						id: request.id,
						deleted: true
					}
				};
			});
	}
}

export { WalletsMockRESTApiClient };
export type { IWalletsRESTApiClient };