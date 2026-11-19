import { METRICS_READINESS_PROBE, SEARCH_READINESS_PROBE } from "../api/index.ts";

import type { GuestDemoReadinessProbeDto } from "../api/index.ts";
import type { GuestDemoPreparationStatus } from "../types.ts";


interface ScheduledReadinessProbe {
	readonly probe: GuestDemoReadinessProbeDto;
	readonly pollIntervalMs: number;
	readonly reaches: GuestDemoPreparationStatus;
}

const READINESS_SCHEDULE: readonly ScheduledReadinessProbe[] = [
	{ probe: METRICS_READINESS_PROBE, pollIntervalMs: 600, reaches: 'browsable' },
	{ probe: SEARCH_READINESS_PROBE, pollIntervalMs: 2000, reaches: 'ready' },
];

const READINESS_TIMEOUT_MS = 60 * 1000;

const SESSION_RETRY_DELAYS_MS: readonly number[] = [1000, 3000];

export { READINESS_SCHEDULE, READINESS_TIMEOUT_MS, SESSION_RETRY_DELAYS_MS };
export type { ScheduledReadinessProbe };
