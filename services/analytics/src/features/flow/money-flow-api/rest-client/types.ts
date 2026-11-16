import type { ApiEnvelope } from "@internal/shared";
import type { MoneyFlowDto, MoneyFlowMetaDto, MoneyFlowParamsDto } from "../types.ts";


interface MoneyFlowRequest {
	params: MoneyFlowParamsDto;
}

type MoneyFlowResponse = ApiEnvelope<MoneyFlowDto, MoneyFlowMetaDto>;

interface IMoneyFlowRESTApiClient {
	getMoneyFlow: (request: MoneyFlowRequest) => Promise<MoneyFlowResponse>;
}

export type { IMoneyFlowRESTApiClient, MoneyFlowRequest, MoneyFlowResponse };
