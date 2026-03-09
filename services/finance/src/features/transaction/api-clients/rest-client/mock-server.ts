import type {
	ITransactionsRESTApiClient
} from "@feature/transaction";
import {
	IStorage, 
	LocalStorageMock
} from "@internal/shared";
import type {
	Wallet
} from "@entity/wallet";
import type {
	StorageTransaction,
	TransactionDeleteRequest, TransactionDeleteResponse,
	TransactionGetRequest, TransactionGetResponse, 
	TransactionListRequest, TransactionListResponse,
	TransactionPostRequest, TransactionPostResponse,
} from "./types.ts";
import {
	flatToTransactionDetailed,
	flatToTransactionPreview
} from "../mutators/flat-to-api.ts";
import {
	createTransactionFromMinimalPayload,
	storageToTransaction
} from "./utils.ts";


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
			.then(() => { this.storage.add(filledPayload); })
			.then(() => {
				if (filledPayload.from) {
					const fromWallet = this.walletStorage.get(filledPayload.from.wallet);
					if (fromWallet) {
						this.walletStorage.remove(fromWallet);
						fromWallet.balance.amount -= filledPayload.from.amount;
						this.walletStorage.add(fromWallet);
					}
				}
				if (filledPayload.to) {
					const toWallet = this.walletStorage.get(filledPayload.to.wallet);
					if (toWallet) {
						this.walletStorage.remove(toWallet);
						toWallet.balance.amount += filledPayload.to.amount;
						this.walletStorage.add(toWallet);
					}
				}
			})
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
