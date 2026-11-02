import { METRICS_READINESS_PROBE, SEARCH_READINESS_PROBE } from "../guest-demo-api";

import type { GuestDemoReadinessProbeDto } from "../guest-demo-api";
import type { GuestDemoPreparationStatus } from "../guest-demo-session";


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

export { READINESS_SCHEDULE, READINESS_TIMEOUT_MS };
export type { ScheduledReadinessProbe };
