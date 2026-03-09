import {
	IAnalyticsRESTApiClient, 
	BalanceHistoryDatasetGetRequest, BalanceHistoryDatasetGetResponse,
	CategoryDatasetGetRequest, CategoryDatasetGetResponse,
	ExpenditureDatasetGetRequest, ExpenditureDatasetGetResponse,
	MoneyFlowDatasetGetRequest, MoneyFlowDatasetGetResponse,
	SpendingHeatmapDatasetGetRequest, SpendingHeatmapDatasetGetResponse
} from "./types.ts";
import { AxiosInstance } from "axios";


class AnalyticsDjangoRESTApiClient implements IAnalyticsRESTApiClient {
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

	public getCategoryDataset(
		request: CategoryDatasetGetRequest
	): Promise<CategoryDatasetGetResponse> {
		const postfix = this.resolvePostfix(request.params);
		
		return this.axiosInstance.get<CategoryDatasetGetResponse>(`/categories/${postfix}`)
			.then((response) => response.data);
	}
	
	public getMoneyFlowDataset(
		request: MoneyFlowDatasetGetRequest
	): Promise<MoneyFlowDatasetGetResponse> {
		const postfix = this.resolvePostfix(request.params);
		
		return this.axiosInstance.get<MoneyFlowDatasetGetResponse>(`/money-flow/${postfix}`)
			.then((response) => response.data);
	}
	
	public getExpenditureDataset(
		request: ExpenditureDatasetGetRequest
	): Promise<ExpenditureDatasetGetResponse> {
		const postfix = this.resolvePostfix(request.params);
		
		return this.axiosInstance.get<ExpenditureDatasetGetResponse>(`/expenditure/${postfix}`)
			.then((response) => response.data);
	}
	
	public getBalanceHistoryDataset(
		request: BalanceHistoryDatasetGetRequest
	): Promise<BalanceHistoryDatasetGetResponse> {
		const postfix = this.resolvePostfix(request.params);
		
		return this.axiosInstance.get<BalanceHistoryDatasetGetResponse>(`/wallet-history/${request.id}/${postfix}`)
			.then((response) => response.data);
	}
	
	public getSpendingHeatmapDataset(
		request: SpendingHeatmapDatasetGetRequest
	): Promise<SpendingHeatmapDatasetGetResponse> {
		const postfix = this.resolvePostfix(request.params);
		
		return this.axiosInstance.get<SpendingHeatmapDatasetGetResponse>(`/spending-heatmap/${postfix}`)
			.then((response) => response.data);
	}
}

export { AnalyticsDjangoRESTApiClient };
