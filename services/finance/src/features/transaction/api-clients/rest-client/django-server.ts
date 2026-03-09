import type { ITransactionsRESTApiClient } from "@feature/transaction";
import type {
	TransactionDeleteRequest, TransactionDeleteResponse,
	TransactionGetRequest, TransactionGetResponse,
	TransactionListRequest, TransactionListResponse,
	TransactionPostRequest, TransactionPostResponse
} from "./types.ts";
import type { AxiosInstance } from "axios";


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
			.then((response) => response.data);
	}

	public post(
		request: TransactionPostRequest
	): Promise<TransactionPostResponse> {
		const postfix = this.resolvePostfix(request.params);
		const adjustedData = { ...request.data };
		
		if (adjustedData.from?.amount) {
			adjustedData.from.amount = Number(adjustedData.from.amount.toFixed(2));
		} 
		if (adjustedData.to?.amount) {
			adjustedData.to.amount = Number(adjustedData.to.amount.toFixed(2));
		}
		
		return this.axiosInstance.post<TransactionPostResponse>(`/${postfix}`, adjustedData)
			.then((response) => response.data);
	}

	public list(
		request: TransactionListRequest
	): Promise<TransactionListResponse> {
		const postfix = this.resolvePostfix(request.params);

		return this.axiosInstance.get<TransactionListResponse>(`/${postfix}`)
			.then((response) => response.data);
	}

	delete(
		request: TransactionDeleteRequest
	): Promise<TransactionDeleteResponse> {
		const postfix = this.resolvePostfix(request.params);
		
		return this.axiosInstance.delete<TransactionDeleteResponse>(`/${postfix}`)
			.then((response) => response.data);
	}
}

export { TransactionDjangoRESTApiClient };
