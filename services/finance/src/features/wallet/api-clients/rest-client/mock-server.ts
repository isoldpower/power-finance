import {v4 as uuidv4} from "uuid";

import type {Wallet} from "@entity/wallet";
import type {IStorage} from "@internal/shared";
import {LocalStorageMock} from "@internal/shared";

import {flatToWalletDetailed, flatToWalletPreview} from "../mutators/flat-to-api.ts";
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


interface StoredTransaction {
	id: string;
	source_wallet_id: string;
	amount: string;
}

class WalletsMockRESTApiClient implements IWalletsRESTApiClient {
	private readonly storage: IStorage<Wallet>;
	private readonly transactions: IStorage<StoredTransaction>;

	constructor(_key: string) {
		this.storage = new LocalStorageMock<Wallet>(_key);
		// Balances are derived from the transactions ledger so they stay in sync once
		// a transaction is created and the wallets query is re-fetched.
		this.transactions = new LocalStorageMock<StoredTransaction>('transactions');
	}

	private withLiveBalance(wallet: Wallet): Wallet {
		const delta = this.transactions.list().reduce(
			(sum, txn) => txn.source_wallet_id === wallet.id ? sum + (parseFloat(txn.amount) || 0) : sum,
			0
		);
		return { ...wallet, balance: { ...wallet.balance, amount: wallet.balance.amount + delta } };
	}

	public get(
		request: WalletGetRequest
	): Promise<WalletGetResponse> {
		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) throw new Error("Not found");

				return flatToWalletDetailed(this.withLiveBalance(value));
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

		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => { this.storage.add(filledPayload); })
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

		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => items.slice(start, end))
			.then((values) => ({
				data: values.map((value) => flatToWalletPreview(this.withLiveBalance(value))),
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
		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) throw new Error("Not found");

				this.storage.remove(value);
				const openingAmount = value.balance.amount;
				const updatedValue = Object.assign(value, request.data, { updatedAt: new Date().toISOString() });
				// The stored balance is the wallet's opening amount; the live balance is derived from
				// the transaction ledger, so a client write must never overwrite it (that double-counts).
				updatedValue.balance = { ...updatedValue.balance, amount: openingAmount };
				this.storage.add(updatedValue);
				return flatToWalletDetailed(this.withLiveBalance(updatedValue));
			});
	}

	put(
		request: WalletPutRequest
	): Promise<WalletPutResponse> {
		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) throw new Error("Not found");

				this.storage.remove(value);
				const updatedValue: Wallet = Object.assign(
					{ id: value.id, createdAt: value.createdAt, updatedAt: new Date().toISOString() },
					request.data
				);
				// Opening balance is server-owned (live balance derives from the ledger); keep the stored amount.
				updatedValue.balance = { ...updatedValue.balance, amount: value.balance.amount };
				this.storage.add(updatedValue);
				return flatToWalletDetailed(this.withLiveBalance(updatedValue));
			});
	}

	delete(
		request: WalletDeleteRequest
	): Promise<WalletDeleteResponse> {
		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) throw new Error("Not found");

				this.storage.remove(value);
				return {
					message: `Successfully deleted resource at ${request.id}`,
					meta: {
						id: request.id,
						success: true
					}
				};
			});
	}
}

export { WalletsMockRESTApiClient };
