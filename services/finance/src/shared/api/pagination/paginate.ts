import { decodeCursor, encodeCursor } from "./cursors.ts";
import { clampLimit } from "./page.ts";
import type { PaginationMeta } from "../envelope";
import type { PageParams } from "./page.ts";

interface PaginatedSlice<TItem> {
	items: TItem[];
	meta: PaginationMeta;
}

const paginate = <TItem>(
	items: TItem[],
	params: PageParams | undefined,
	query: string,
): PaginatedSlice<TItem> => {
	const limit = clampLimit(params?.limit);
	const anchor = params?.cursor ? decodeCursor(params.cursor, query) : null;
	const start = anchor
		? (anchor.direction === 'next' ? anchor.index : Math.max(anchor.index - limit, 0))
		: 0;
	const end = Math.min(start + limit, items.length);
	const slice = items.slice(start, end);

	return {
		items: slice,
		meta: {
			limit,
			total: items.length,
			next_cursor: end < items.length ? encodeCursor({ direction: 'next', index: end, query }) : null,
			prev_cursor: start > 0 ? encodeCursor({ direction: 'prev', index: start, query }) : null,
		},
	};
};

const unpaginated = <TItem>(items: TItem[]): PaginatedSlice<TItem> => ({
	items,
	meta: {
		limit: null,
		total: items.length,
		next_cursor: null,
		prev_cursor: null,
	},
});

export { paginate, unpaginated };
export type { PaginatedSlice };
