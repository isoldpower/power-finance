import { isApiError } from "@shared/api";

import { isRerouteHole, isStaleProjection } from "./retry-policy.ts";


const STALE_REFETCH_INTERVAL_MS = 5000;
const MAX_STALE_REFETCHES = 6;

function isTransientReadError(error: Error | null): boolean {
	return (
		error !== null && 
		isApiError(error) && 
		(isStaleProjection(error) || isRerouteHole(error))
	);
}

function hasStaleRecovery(error: Error | null, errorUpdateCount: number): boolean {
	return (
		isTransientReadError(error) &&
		errorUpdateCount < MAX_STALE_REFETCHES
	);
}

function staleRefetchInterval(error: Error | null, errorUpdateCount: number): number | false {
	return hasStaleRecovery(error, errorUpdateCount) 
		? STALE_REFETCH_INTERVAL_MS 
		: false;
}

export { hasStaleRecovery, staleRefetchInterval, MAX_STALE_REFETCHES, STALE_REFETCH_INTERVAL_MS };
