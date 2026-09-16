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

const SILENT_MUTATION_KEYS: string[] = ['sendAssistantMessage'];

const isSilentMutation = (key: string): boolean => SILENT_MUTATION_KEYS.includes(key);

export { API_MUTATION_TOAST_POLICY, API_QUERY_TOAST_POLICY, API_TOAST_DURATIONS, isSilentMutation };
export type { ApiToastPolicy };
