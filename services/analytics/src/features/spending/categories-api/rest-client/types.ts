import type { ApiEnvelope } from "@internal/shared";
import type {
	CategoryBreakdownDto,
	CategoryBreakdownMetaDto,
	CategoryBreakdownParamsDto,
	CategoryTrendsDto,
	CategoryTrendsMetaDto,
	CategoryTrendsParamsDto,
} from "../types.ts";


interface CategoryBreakdownRequest {
	params: CategoryBreakdownParamsDto;
}

type CategoryBreakdownResponse = ApiEnvelope<CategoryBreakdownDto, CategoryBreakdownMetaDto>;

interface CategoryTrendsRequest {
	params: CategoryTrendsParamsDto;
}

type CategoryTrendsResponse = ApiEnvelope<CategoryTrendsDto, CategoryTrendsMetaDto>;

interface ICategoriesRESTApiClient {
	getBreakdown: (request: CategoryBreakdownRequest) => Promise<CategoryBreakdownResponse>;
	getTrends: (request: CategoryTrendsRequest) => Promise<CategoryTrendsResponse>;
}

export type {
	CategoryBreakdownRequest,
	CategoryBreakdownResponse,
	CategoryTrendsRequest,
	CategoryTrendsResponse,
	ICategoriesRESTApiClient,
};
