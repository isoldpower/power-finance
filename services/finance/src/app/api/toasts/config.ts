import type { ApiToastPhase } from "./types.ts";


type ApiToastPolicy = Record<ApiToastPhase, boolean>;

const API_TOAST_DURATIONS = {
	success: 2500,
	error: 6000,
} as const;

const API_QUERY_TOAST_POLICY: ApiToastPolicy = {
	requested: false,
	succeeded: false,
	failed: true,
};

const API_MUTATION_TOAST_POLICY: ApiToastPolicy = {
	requested: true,
	succeeded: true,
	failed: true,
};

export { API_MUTATION_TOAST_POLICY, API_QUERY_TOAST_POLICY, API_TOAST_DURATIONS };
export type { ApiToastPolicy };
