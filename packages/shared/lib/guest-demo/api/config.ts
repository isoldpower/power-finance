import type { GuestDemoReadinessProbeDto } from "./types.ts";


const API_V1_PATH = '/api/v1';
const GUEST_DEMO_SESSIONS_PATH = '/demo/sessions';

const METRICS_READINESS_PROBE: GuestDemoReadinessProbeDto = {
	path: '/metrics',
	method: 'GET',
};

const SEARCH_READINESS_PROBE: GuestDemoReadinessProbeDto = {
	path: '/transactions/search?limit=1',
	method: 'POST',
	body: {
		filter_body: {
			and: [{ field_name: 'created_at', operator: 'gte', value: '1970-01-01T00:00:00+00:00' }],
		},
	},
};

export { API_V1_PATH, GUEST_DEMO_SESSIONS_PATH, METRICS_READINESS_PROBE, SEARCH_READINESS_PROBE };
