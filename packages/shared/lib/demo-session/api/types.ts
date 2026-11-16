import type { ApiEnvelope } from "../../api/index.ts";


interface DemoSessionDto {
	id: string;
	expires_at: string;
}

interface IDemoSessionsRESTApiClient {
	issue: () => Promise<ApiEnvelope<DemoSessionDto>>;
}

export type { DemoSessionDto, IDemoSessionsRESTApiClient };
