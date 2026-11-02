import type {
	GuestDemoReadinessProbeResponse,
	GuestDemoSessionPostResponse,
	IGuestDemoReadinessRESTApiClient,
	IGuestDemoSessionsRESTApiClient,
} from "./types.ts";


const MOCK_SESSION_LIFETIME_MS = 24 * 60 * 60 * 1000;
const MOCK_READY_STATUS = 200;

class GuestDemoSessionsMockRESTApiClient implements IGuestDemoSessionsRESTApiClient {
	public post(): Promise<GuestDemoSessionPostResponse> {
		return Promise.resolve({
			body: {
				data: {
					token: 'mock-guest-demo-token',
					expires_at: new Date(Date.now() + MOCK_SESSION_LIFETIME_MS).toISOString(),
				},
				meta: {},
			},
			writeVersion: null,
		});
	}
}

class GuestDemoReadinessMockRESTApiClient implements IGuestDemoReadinessRESTApiClient {
	public probe(): Promise<GuestDemoReadinessProbeResponse> {
		return Promise.resolve({ status: MOCK_READY_STATUS });
	}
}

export { GuestDemoReadinessMockRESTApiClient, GuestDemoSessionsMockRESTApiClient };
