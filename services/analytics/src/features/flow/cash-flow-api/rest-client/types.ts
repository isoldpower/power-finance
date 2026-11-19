import type { ApiEnvelope } from "@internal/shared";
import type { CashFlowDto, CashFlowMetaDto, CashFlowParamsDto } from "../types.ts";


interface CashFlowRequest {
	params: CashFlowParamsDto;
}

type CashFlowResponse = ApiEnvelope<CashFlowDto, CashFlowMetaDto>;

interface ICashFlowRESTApiClient {
	getCashFlow: (request: CashFlowRequest) => Promise<CashFlowResponse>;
}

export type { CashFlowRequest, CashFlowResponse, ICashFlowRESTApiClient };
