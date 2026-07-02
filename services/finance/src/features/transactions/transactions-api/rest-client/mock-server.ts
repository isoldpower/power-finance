import type { ITransactionsRESTApiClient } from "@feature/transactions";
import { IStorage, LocalStorageMock } from "@internal/shared";
import type {
	TransactionDeleteRequest, TransactionDeleteResponse,
	TransactionGetRequest, TransactionGetResponse,
	TransactionListRequest, TransactionListResponse,
	TransactionPostRequest, TransactionPostResponse,
} from "./types.ts";
import { StorageTransaction, createTransactionFromMinimalPayload } from "./utils.ts";


class TransactionMockRESTApiClient implements ITransactionsRESTApiClient {
	private readonly storage: IStorage<StorageTransaction>;

	constructor(_key: string) {
		this.storage = new LocalStorageMock<StorageTransaction>(_key);
	}

	public get(
		request: TransactionGetRequest
	): Promise<TransactionGetResponse> {
		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) throw new Error("Not found");

				return {
					id: value.id,
					amount: value.amount,
					currency_code: value.currency_code,
					source_wallet: {
						id: value.source_wallet_id,
						name: '',
						balance: { amount: 0, currency: '' },
						credit: false,
					},
					created_at: value.created_at,
				};
			});
	}

	public post(
		request: TransactionPostRequest
	): Promise<TransactionPostResponse> {
		const stored = createTransactionFromMinimalPayload(request.data);

		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => { this.storage.add(stored); })
			.then(() => ({
				id: stored.id,
				amount: stored.amount,
				currency_code: stored.currency_code,
				source_wallet: {
					id: stored.source_wallet_id,
					name: '',
					balance: { amount: 0, currency: '' },
					credit: false,
				},
				created_at: stored.created_at,
			}));
	}

	public list(
		request: TransactionListRequest
	): Promise<TransactionListResponse> {
		const items = this.storage.list();
		const start = request.params?.offset ?? 0;
		const end = request.params?.limit
			? start + request.params.limit
			: items.length;

		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => items.slice(start, end))
			.then((values) => ({
				data: values.map((v) => ({
					id: v.id,
					amount: v.amount,
					currency_code: v.currency_code,
					source_wallet_id: v.source_wallet_id,
					created_at: v.created_at,
				})),
				meta: {
					total: items.length,
					offset: start,
					limit: end - start,
				}
			}));
	}

	delete(
		request: TransactionDeleteRequest
	): Promise<TransactionDeleteResponse> {
		return new Promise((resolve) => setTimeout(resolve, 250))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) throw new Error("Not found");

				this.storage.remove(value);
				return {
					message: `Successfully deleted resource at ${request.id}`,
					meta: {
						id: request.id,
						success: true,
					}
				};
			});
	}
}

export { TransactionMockRESTApiClient };
