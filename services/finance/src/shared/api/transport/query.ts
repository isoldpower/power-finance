import { QUERY_ARRAY_SEPARATOR } from "./config.ts";


type QueryValue = string | number | boolean | string[] | undefined | null;

function serializeParams(params: Record<string, QueryValue> | undefined): string {
	if (!params) {
		return '';
	}

	const querySearch = new URLSearchParams();
	for (const [paramName, paramValue] of Object.entries(params)) {
		if (paramValue === undefined || paramValue === null) {
			continue;
		}

		if (Array.isArray(paramValue)) {
			if (paramValue.length !== 0) {
				querySearch.set(paramName, paramValue.join(QUERY_ARRAY_SEPARATOR));
			}
		} else {
			querySearch.set(paramName, String(paramValue));
		}
	}

	return querySearch.toString();
}

export { serializeParams };
export type { QueryValue };
