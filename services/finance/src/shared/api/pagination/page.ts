import type { PaginationMeta } from "../envelope";

const DEFAULT_PAGE_LIMIT = 25;
const MIN_PAGE_LIMIT = 1;
const MAX_PAGE_LIMIT = 100;

interface PageParams {
	limit?: number;
	cursor?: string;
}

interface Page<TItem> {
	items: TItem[];
	limit: number | null;
	total: number;
	nextCursor: string | null;
	prevCursor: string | null;
}

const clampLimit = (limit: number | undefined): number => {
	if (limit === undefined) return DEFAULT_PAGE_LIMIT;

	return Math.min(Math.max(Math.trunc(limit), MIN_PAGE_LIMIT), MAX_PAGE_LIMIT);
};

const pageFromMeta = <TItem>(items: TItem[], meta: PaginationMeta): Page<TItem> => ({
	items,
	limit: meta.limit,
	total: meta.total,
	nextCursor: meta.next_cursor,
	prevCursor: meta.prev_cursor,
});

export { DEFAULT_PAGE_LIMIT, MIN_PAGE_LIMIT, MAX_PAGE_LIMIT, clampLimit, pageFromMeta };
export type { Page, PageParams };
