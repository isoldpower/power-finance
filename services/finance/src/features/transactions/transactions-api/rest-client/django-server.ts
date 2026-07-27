import type { ITransactionsRESTApiClient } from "@feature/transactions";
import type {
	TransactionDeleteRequest, TransactionDeleteResponse,
	TransactionGetRequest, TransactionGetResponse,
	TransactionListRequest, TransactionListResponse,
	TransactionPatchRequest, TransactionPatchResponse,
	TransactionPostRequest, TransactionPostResponse
} from "./types.ts";
import type { TransactionDetailed } from "../types.ts";
import type { AxiosInstance } from "axios";


const parseTransactionDetailed = (transaction: TransactionDetailed): TransactionDetailed => ({
	...transaction,
	wallet: {
		...transaction.wallet,
		balance: {
			...transaction.wallet.balance,
			amount: parseFloat(transaction.wallet.balance.amount as unknown as string),
		},
	},
});


class TransactionDjangoRESTApiClient implements ITransactionsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;

	constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
	}

	private resolvePostfix(params: object | undefined): string {
		let requestPostfix = '';
		if (params && Object.entries(params).length > 0) {
			const urlParams = new URLSearchParams(Object.entries(params));
			requestPostfix = `?${urlParams.toString()}`;
		}

		return requestPostfix;
	}

	public get(
		request: TransactionGetRequest
	): Promise<TransactionGetResponse> {
		const postfix = this.resolvePostfix(request.params);

		return this.axiosInstance.get<TransactionGetResponse>(`/${request.id}/${postfix}`)
			.then((response) => parseTransactionDetailed(response.data));
	}

	public post(
		request: TransactionPostRequest
	): Promise<TransactionPostResponse> {
		const postfix = this.resolvePostfix(request.params);

		return this.axiosInstance.post<TransactionPostResponse>(`/${postfix}`, request.data)
			.then((response) => parseTransactionDetailed(response.data));
	}

	public list(
		request: TransactionListRequest
	): Promise<TransactionListResponse> {
		const postfix = this.resolvePostfix(request.params);

		return this.axiosInstance.get<TransactionListResponse>(`/${postfix}`)
			.then((response) => response.data);
	}

	public patch(
		request: TransactionPatchRequest
	): Promise<TransactionPatchResponse> {
		const postfix = this.resolvePostfix(request.params);

		return this.axiosInstance.patch<TransactionPatchResponse>(`/${request.id}/${postfix}`, request.data)
			.then((response) => parseTransactionDetailed(response.data));
	}

	delete(
		request: TransactionDeleteRequest
	): Promise<TransactionDeleteResponse> {
		const postfix = this.resolvePostfix(request.params);

		return this.axiosInstance.delete<TransactionDeleteResponse>(`/${request.id}/${postfix}`)
			.then((response) => response.data);
	}
}

export { TransactionDjangoRESTApiClient };
