import type { ApiEnvelope } from "@internal/shared";
import type { DimensionsDto, DimensionsMetaDto } from "../types.ts";


interface DimensionsParamsDto {
	currency: string;
}

interface DimensionsRequest {
	params: DimensionsParamsDto;
}

type DimensionsResponse = ApiEnvelope<DimensionsDto, DimensionsMetaDto>;

interface ILedgerRESTApiClient {
	getDimensions: (request: DimensionsRequest) => Promise<DimensionsResponse>;
}

export type { DimensionsParamsDto, DimensionsRequest, DimensionsResponse, ILedgerRESTApiClient };
