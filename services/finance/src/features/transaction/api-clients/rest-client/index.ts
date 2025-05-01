import { v4 as uuidv4 } from "uuid";

import { LocalStorageMock } from "@app/api";
import { flatToTransactionDetailed, flatToTransactionPreview } from "../mutators/flat-to-api.ts";
import { transactionDetailedResponseToFlat } from "../mutators/api-to-flat.ts";
import type { Transaction } from "@entity/transaction";
import type { IStorage } from "@app/api";
import type {
	ITransactionsRESTApiClient,
	TransactionGetRequest, TransactionGetResponse,
	TransactionPostRequest, TransactionPostResponse,
	TransactionListRequest, TransactionListResponse,
	TransactionPutRequest, TransactionPutResponse,
	TransactionDeleteRequest, TransactionDeleteResponse
} from "./types.ts";
import type { TransactionDetailed, TransactionMinimalPayload } from "../types.ts";


const createTransactionFromMinimalPayload = (
	data: TransactionMinimalPayload
): Transaction => {
	const timestamp = new Date().toISOString();
	const id = uuidv4();
	const transformableData = Object.assign(data, {
		id,
		meta: { id, createdAt: timestamp }
	}) satisfies TransactionDetailed;

	return transactionDetailedResponseToFlat(transformableData);
};


class TransactionMockRESTApiClient implements ITransactionsRESTApiClient {
	private readonly storage: IStorage<Transaction>;

	constructor(_key: string) {
		this.storage = new LocalStorageMock<Transaction>(_key);
	}

	public get(
		request: TransactionGetRequest
	): Promise<TransactionGetResponse> {
		return new Promise((resolve) => setTimeout(resolve, 1000))
			.then(() => this.storage.get(request.id))
			.then((value) => {
				if (!value) throw new Error("Not found");

				return flatToTransactionDetailed(value);
			});
	}

	public post(
		request: TransactionPostRequest
	): Promise<TransactionPostResponse> {
		const filledPayload = createTransactionFromMinimalPayload(request.data);

		return new Promise((resolve) => setTimeout(resolve, 1000))
			.then(() => this.storage.add(filledPayload))
			.then(() => flatToTransactionDetailed(filledPayload));
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
				return flatToTransactionDetailed(updatedValue);
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