import type { GuestDemoReadinessProbeDto } from "./types.ts";


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

export { METRICS_READINESS_PROBE, SEARCH_READINESS_PROBE };
