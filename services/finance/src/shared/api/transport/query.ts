import { QUERY_ARRAY_SEPARATOR } from "./config.ts";


type QueryValue = string | number | boolean | string[] | undefined | null;

const buildQuery = (params: Record<string, QueryValue> | undefined): string => {
	if (!params) return '';

	const querySearch = new URLSearchParams();

	for (const [paramName, paramValue] of Object.entries(params)) {
		if (paramValue === undefined || paramValue === null) continue;

		if (Array.isArray(paramValue)) {
			if (paramValue.length === 0) continue;

			querySearch.set(paramName, paramValue.join(QUERY_ARRAY_SEPARATOR));
			continue;
		}

		querySearch.set(paramName, String(paramValue));
	}

	const queryString = querySearch.toString();

	return queryString ? `?${queryString}` : '';
};

export { buildQuery };
export type { QueryValue };
