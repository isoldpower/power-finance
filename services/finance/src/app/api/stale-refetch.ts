import { isApiError } from "@shared/api";

import { isRerouteHole, isStaleProjection } from "./retry-policy.ts";


const STALE_REFETCH_INTERVAL_MS = 5000;

function isTransientReadError(error: Error | null): boolean {
	return error !== null && isApiError(error) && (isStaleProjection(error) || isRerouteHole(error));
}

function staleRefetchInterval(error: Error | null): number | false {
	return isTransientReadError(error) ? STALE_REFETCH_INTERVAL_MS : false;
}

export { staleRefetchInterval, STALE_REFETCH_INTERVAL_MS };
