import type { ApiEnvelope } from "../../api/index.ts";
import type { DemoSessionDto, IDemoSessionsRESTApiClient } from "./types.ts";


const MOCK_DEMO_SESSION_LIFETIME_MS = 24 * 60 * 60 * 1000;

class DemoSessionsMockRESTApiClient implements IDemoSessionsRESTApiClient {
	public issue(): Promise<ApiEnvelope<DemoSessionDto>> {
		const expiresAt = new Date(Date.now() + MOCK_DEMO_SESSION_LIFETIME_MS);

		return Promise.resolve({
			data: {
				id: `mock_demo_session_${crypto.randomUUID().replace(/-/g, '')}`,
				expires_at: expiresAt.toISOString(),
			},
			meta: {},
		});
	}
}

export { DemoSessionsMockRESTApiClient };
