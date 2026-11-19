import type { ApiEnvelope } from "@internal/shared";
import type { OverviewDto, OverviewMetaDto, OverviewParamsDto } from "../types.ts";


interface OverviewRequest {
	params: OverviewParamsDto;
}

type OverviewResponse = ApiEnvelope<OverviewDto, OverviewMetaDto>;

interface IOverviewRESTApiClient {
	getOverview: (request: OverviewRequest) => Promise<OverviewResponse>;
}

export type { IOverviewRESTApiClient, OverviewRequest, OverviewResponse };
