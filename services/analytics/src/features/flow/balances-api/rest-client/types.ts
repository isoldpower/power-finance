import type { ApiEnvelope } from "@internal/shared";
import type { BalanceHistoryDto, BalanceHistoryMetaDto, BalanceHistoryParamsDto } from "../types.ts";


interface BalanceHistoryRequest {
	params: BalanceHistoryParamsDto;
}

type BalanceHistoryResponse = ApiEnvelope<BalanceHistoryDto, BalanceHistoryMetaDto>;

interface IBalancesRESTApiClient {
	getBalanceHistory: (request: BalanceHistoryRequest) => Promise<BalanceHistoryResponse>;
}

export type { BalanceHistoryRequest, BalanceHistoryResponse, IBalancesRESTApiClient };
