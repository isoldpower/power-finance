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
import { flatToTransactionDetailed, flatPreviewToTransactionPreview } from "../mutators/flat-to-api.ts";
import { createTransactionFromMinimalPayload, storageToTransaction } from "./utils.ts";


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
				if (filledPayload.sender) {
					const senderWallet = this.walletStorage.get(filledPayload.sender.wallet);
					if (senderWallet) {
						this.walletStorage.remove(senderWallet);
						senderWallet.balance.amount -= filledPayload.sender.amount;
						this.walletStorage.add(senderWallet);
					}
				}
				if (filledPayload.receiver) {
					const receiverWallet = this.walletStorage.get(filledPayload.receiver.wallet);
					if (receiverWallet) {
						this.walletStorage.remove(receiverWallet);
						receiverWallet.balance.amount += filledPayload.receiver.amount;
						this.walletStorage.add(receiverWallet);
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
				data: values.map(flatPreviewToTransactionPreview),
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
						success: true
					}
				};
			});
	}
}

export { TransactionMockRESTApiClient };
