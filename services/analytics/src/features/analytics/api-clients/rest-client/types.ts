import type { GetRequest } from "@internal/shared";
import {
	CategoriesAnalyticsResponse,
	ExpenditureAnalyticsResponse,
	MoneyFlowAnalyticsResponse,
	SpendingHeatmapResponse,
	WalletBalanceHistoryResponse
} from "../types";

interface IAnalyticsRESTApiClient {
	getCategoryDataset: (request: CategoryDatasetGetRequest) => Promise<CategoryDatasetGetResponse>,
	getMoneyFlowDataset: (request: MoneyFlowDatasetGetRequest) => Promise<MoneyFlowDatasetGetResponse>,
	getExpenditureDataset: (request: ExpenditureDatasetGetRequest) => Promise<ExpenditureDatasetGetResponse>,
	getBalanceHistoryDataset: (request: BalanceHistoryDatasetGetRequest) => Promise<BalanceHistoryDatasetGetResponse>,
	getSpendingHeatmapDataset: (request: SpendingHeatmapDatasetGetRequest) => Promise<SpendingHeatmapDatasetGetResponse>,
}

interface CategoryDatasetGetRequest { params?: object }
type CategoryDatasetGetResponse = CategoriesAnalyticsResponse;

interface MoneyFlowDatasetGetRequest { params?: object }
type MoneyFlowDatasetGetResponse = MoneyFlowAnalyticsResponse;

interface ExpenditureDatasetGetRequest { params?: object }
type ExpenditureDatasetGetResponse = ExpenditureAnalyticsResponse;

type BalanceHistoryDatasetGetRequest = GetRequest<object>
type BalanceHistoryDatasetGetResponse = WalletBalanceHistoryResponse;

interface SpendingHeatmapDatasetGetRequest { params?: object }
type SpendingHeatmapDatasetGetResponse = SpendingHeatmapResponse;

export type { CategoryDatasetGetRequest, CategoryDatasetGetResponse };
export type { MoneyFlowDatasetGetRequest, MoneyFlowDatasetGetResponse };
export type { ExpenditureDatasetGetRequest, ExpenditureDatasetGetResponse };
export type { BalanceHistoryDatasetGetRequest, BalanceHistoryDatasetGetResponse };
export type { SpendingHeatmapDatasetGetRequest, SpendingHeatmapDatasetGetResponse };
export type {IAnalyticsRESTApiClient};