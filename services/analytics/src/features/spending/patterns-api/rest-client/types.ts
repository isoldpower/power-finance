import type { ApiEnvelope } from "@internal/shared";
import type {
	PatternsMetaDto,
	SpendingCalendarDto,
	SpendingCalendarParamsDto,
	SpendingRhythmDto,
	SpendingRhythmParamsDto,
} from "../types.ts";


interface SpendingCalendarRequest {
	params: SpendingCalendarParamsDto;
}

type SpendingCalendarResponse = ApiEnvelope<SpendingCalendarDto, PatternsMetaDto>;

interface SpendingRhythmRequest {
	params: SpendingRhythmParamsDto;
}

type SpendingRhythmResponse = ApiEnvelope<SpendingRhythmDto, PatternsMetaDto>;

interface IPatternsRESTApiClient {
	getCalendar: (request: SpendingCalendarRequest) => Promise<SpendingCalendarResponse>;
	getRhythm: (request: SpendingRhythmRequest) => Promise<SpendingRhythmResponse>;
}

export type {
	IPatternsRESTApiClient,
	SpendingCalendarRequest,
	SpendingCalendarResponse,
	SpendingRhythmRequest,
	SpendingRhythmResponse,
};
