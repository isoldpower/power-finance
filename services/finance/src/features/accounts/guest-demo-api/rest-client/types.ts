import type { ApiEnvelope } from "@shared/api";
import type { GuestDemoReadinessProbeDto, GuestDemoSessionDto } from "../types.ts";


interface GuestDemoSessionPostResponse {
	body: ApiEnvelope<GuestDemoSessionDto>;
	writeVersion: string | null;
}

interface GuestDemoReadinessProbeRequest {
	probe: GuestDemoReadinessProbeDto;
	writeVersion: string;
}

interface GuestDemoReadinessProbeResponse {
	status: number;
}

interface IGuestDemoSessionsRESTApiClient {
	post: () => Promise<GuestDemoSessionPostResponse>;
}

interface IGuestDemoReadinessRESTApiClient {
	probe: (request: GuestDemoReadinessProbeRequest) => Promise<GuestDemoReadinessProbeResponse>;
}

export type {
	GuestDemoReadinessProbeRequest,
	GuestDemoReadinessProbeResponse,
	GuestDemoSessionPostResponse,
	IGuestDemoReadinessRESTApiClient,
	IGuestDemoSessionsRESTApiClient,
};
