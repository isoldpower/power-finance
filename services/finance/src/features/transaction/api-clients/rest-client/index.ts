import { v4 as uuidv4 } from "uuid";

import { LocalStorageMock } from "@app/api";
import { flatToTransactionDetailed, flatToTransactionPreview } from "../mutators/flat-to-api.ts";
import type { IStorage } from "@app/api";
import type {
	ITransactionsRESTApiClient,
	TransactionGetRequest, TransactionGetResponse,
	TransactionPostRequest, TransactionPostResponse,
	TransactionListRequest, TransactionListResponse,
	TransactionPutRequest, TransactionPutResponse,
	TransactionDeleteRequest, TransactionDeleteResponse
} from "./types.ts";
import type { StorageTransaction, TransactionMinimalPayload } from "../types.ts";
import type { Wallet } from "@entity/wallet";
import type { Transaction } from "@entity/transaction";


const createTransactionFromMinimalPayload = (
	{ data, type }: TransactionMinimalPayload
): StorageTransaction => {
	const timestamp = new Date().toISOString();
	const id = uuidv4();

	return {
		id,
		type,
		description: data.description,
		createdAt: timestamp,
		amount: data.amount || 0,
		from: data.from,
		to: data.to,
	} satisfies StorageTransaction;
};

const storageToTransaction = (
	wallets: Wallet[],
	value: StorageTransaction
): Transaction => {
	const { from, to, ...rest } = value;

	return Object.assign(rest, {
		from: wallets.find((wallet) => wallet.id === value.from) as Wallet,
		to: wallets.find((wallet) => wallet.id === value.to) as Wallet
	}) satisfies Transaction;
}


class TransactionMockRESTApiClient implements ITransactionsRESTApiClient {
	private readonly storage: IStorage<StorageTransaction>;
	private readonly walletStorage: IStorage<Wallet>;

	constructor(_key: string, _walletKey: string) {
		this.storage = new LocalStorageMock<StorageTransaction>(_key);
		this.walletStorage = new LocalStorageMock<Wallet>(_walletKey);
	}

	public get(
		request: TransactionGetRequest
	): Promise<TransactionGetResponse> {
		return new Promise((resolve) => setTimeout(resolve, 1000))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) throw new Error("Not found");

				return storageToTransaction(this.walletStorage.list(), value);
			})
			.then((value) => flatToTransactionDetailed(value));
	}

	public post(
		request: TransactionPostRequest
	): Promise<TransactionPostResponse> {
		const filledPayload = createTransactionFromMinimalPayload(request.data);

		return new Promise((resolve) => setTimeout(resolve, 1000))
			.then(() => this.storage.add(filledPayload))
			.then(() => storageToTransaction(this.walletStorage.list(), filledPayload))
			.then((flat) => flatToTransactionDetailed(flat));
	}

	public list(
		request: TransactionListRequest
	): Promise<TransactionListResponse> {
		const items = this.storage.list();
		const start = request.params?.offset ?? 0;
		const end = request.params?.limit
			? start + request.params.limit
			: items.length;

		return new Promise((resolve) => setTimeout(resolve, 1000))
			.then(() => items.slice(start, end))
			.then((values) => {
				const wallets = this.walletStorage.list();

				return values.map((value) => storageToTransaction(wallets, value));
			})
			.then((values) => ({
				data: values.map(flatToTransactionPreview),
				meta: {
					total: items.length,
					offset: request.params?.offset ?? 0,
					limit: end - start,
				}
			}));
	}

	put(
		request: TransactionPutRequest
	): Promise<TransactionPutResponse> {
		return new Promise((resolve) => setTimeout(resolve, 1000))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) throw new Error("Not found");

				this.storage.remove(value);
				const convertedPayload = createTransactionFromMinimalPayload(request.data);
				const updatedValue = Object.assign(convertedPayload, {
					id: value.id,
					createdAt: value.createdAt
				})
				this.storage.add(updatedValue);
				return flatToTransactionDetailed(storageToTransaction(this.walletStorage.list(), updatedValue));
			});
	}

	delete(
		request: TransactionDeleteRequest
	): Promise<TransactionDeleteResponse> {
		return new Promise((resolve) => setTimeout(resolve, 1000))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) throw new Error("Not found");

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

export { TransactionMockRESTApiClient };
export type { ITransactionsRESTApiClient };