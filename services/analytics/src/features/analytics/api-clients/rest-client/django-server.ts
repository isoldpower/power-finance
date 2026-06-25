import {
	IAnalyticsRESTApiClient,
	BalanceHistoryDatasetGetRequest, BalanceHistoryDatasetGetResponse,
	CategoryDatasetGetRequest, CategoryDatasetGetResponse,
	ExpenditureDatasetGetRequest, ExpenditureDatasetGetResponse,
	MoneyFlowDatasetGetRequest, MoneyFlowDatasetGetResponse,
	SpendingHeatmapDatasetGetRequest, SpendingHeatmapDatasetGetResponse
} from "./types.ts";
import type { MoneyFlowNode } from "../types.ts";
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

		return this.axiosInstance.get<{ data: CategoryDatasetGetResponse; metadata: object }>(`/categories/${postfix}`)
			.then((response) => response.data.data);
	}

	public getMoneyFlowDataset(
		request: MoneyFlowDatasetGetRequest
	): Promise<MoneyFlowDatasetGetResponse> {
		const postfix = this.resolvePostfix(request.params);

		return this.axiosInstance.get<{ data: { nodes: MoneyFlowNode[]; links: { source: string; target: string; value: number }[] }; metadata: object }>(`/money-flow/${postfix}`)
			.then((response) => {
				const { nodes, links } = response.data.data;
				const nodeMap = new Map(nodes.map((n) => [n.name, n]));

				return {
					nodes,
					links: links.map((link) => ({
						source: nodeMap.get(link.source) ?? { name: link.source, level: 0 },
						target: nodeMap.get(link.target) ?? { name: link.target, level: 0 },
						value: link.value,
					})),
				};
			});
	}

	public getExpenditureDataset(
		request: ExpenditureDatasetGetRequest
	): Promise<ExpenditureDatasetGetResponse> {
		const postfix = this.resolvePostfix(request.params);

		return this.axiosInstance.get<{ data: ExpenditureDatasetGetResponse; metadata: object }>(`/expenditure/${postfix}`)
			.then((response) => response.data.data);
	}

	public getBalanceHistoryDataset(
		request: BalanceHistoryDatasetGetRequest
	): Promise<BalanceHistoryDatasetGetResponse> {
		const postfix = this.resolvePostfix(request.params);

		return this.axiosInstance.get<{ data: BalanceHistoryDatasetGetResponse; metadata: object }>(`/wallet-history/${request.id}/${postfix}`)
			.then((response) => response.data.data);
	}

	public getSpendingHeatmapDataset(
		request: SpendingHeatmapDatasetGetRequest
	): Promise<SpendingHeatmapDatasetGetResponse> {
		const postfix = this.resolvePostfix(request.params);

		return this.axiosInstance.get<{ data: SpendingHeatmapDatasetGetResponse; metadata: object }>(`/spending-heatmap/${postfix}`)
			.then((response) => response.data.data);
	}
}

export { AnalyticsDjangoRESTApiClient };
