import type { PaginationMeta } from "../envelope";


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

function pageFromMeta<TItem>(
	items: TItem[],
	meta: PaginationMeta,
): Page<TItem> {
	return {
		items,
		limit: meta.limit,
		total: meta.total,
		nextCursor: meta.next_cursor,
		prevCursor: meta.prev_cursor,
	};
}

export { pageFromMeta };
export type { Page, PageParams };
