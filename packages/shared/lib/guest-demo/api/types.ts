import type { ApiEnvelope } from "../../api/index.ts";


interface GuestDemoSessionDto {
	token: string;
	expires_at: string;
}

type GuestDemoReadinessMethod = 'GET' | 'POST';

interface GuestDemoReadinessProbeDto {
	path: string;
	method: GuestDemoReadinessMethod;
	body?: object;
}

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
	GuestDemoReadinessMethod,
	GuestDemoReadinessProbeDto,
	GuestDemoReadinessProbeRequest,
	GuestDemoReadinessProbeResponse,
	GuestDemoSessionDto,
	GuestDemoSessionPostResponse,
	IGuestDemoReadinessRESTApiClient,
	IGuestDemoSessionsRESTApiClient,
};
