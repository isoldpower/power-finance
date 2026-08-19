import { QUERY_ARRAY_SEPARATOR } from "./config.ts";


type QueryValue = string | number | boolean | string[] | undefined | null;

function buildQuery(params: Record<string, QueryValue> | undefined): string {
	if (!params) {
		return '';
	}

	const querySearch = new URLSearchParams();
	for (const [paramName, paramValue] of Object.entries(params)) {
		if (paramValue !== undefined && paramValue !== null) {
			if (Array.isArray(paramValue) && paramValue.length !== 0) {
				querySearch.set(paramName, paramValue.join(QUERY_ARRAY_SEPARATOR));
			} else {
				querySearch.set(paramName, String(paramValue));
			}
		}
	}

	return querySearch.toString() 
		? `?${querySearch.toString()}` 
		: '';
}

export { buildQuery };
export type { QueryValue };
