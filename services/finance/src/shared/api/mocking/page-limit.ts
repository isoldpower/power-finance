import { DEFAULT_PAGE_LIMIT, MIN_PAGE_LIMIT, MAX_PAGE_LIMIT } from "./config.ts";


function clampLimit(limit: number | undefined): number {
	if (limit === undefined) {
		return DEFAULT_PAGE_LIMIT;
	}

	return Math.min(
		Math.max(Math.trunc(limit), MIN_PAGE_LIMIT),
		MAX_PAGE_LIMIT,
	);
};

export { clampLimit, DEFAULT_PAGE_LIMIT, MIN_PAGE_LIMIT, MAX_PAGE_LIMIT };
