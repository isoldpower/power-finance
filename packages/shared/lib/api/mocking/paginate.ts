import { Cursor } from "./cursors.ts";
import { clampLimit } from "./page-limit.ts";

import type { PaginationMeta } from "../envelope";
import type { PageParams } from "../pagination";


interface PaginatedSlice<TItem> {
	items: TItem[];
	meta: PaginationMeta;
}

function paginate<TItem>(
	items: TItem[],
	params: PageParams | undefined,
	query: string,
): PaginatedSlice<TItem> {
	const limit = clampLimit(params?.limit);
	const anchor = params?.cursor ? Cursor.getDecoded(params.cursor, query) : null;
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
			next_cursor: end < items.length 
				? Cursor.getEncoded({ direction: 'next', index: end, query }) 
				: null,
			prev_cursor: start > 0 
				? Cursor.getEncoded({ direction: 'prev', index: start, query }) 
				: null,
		},
	};
}

function unpaginated<TItem>(items: TItem[]): PaginatedSlice<TItem> {
	return {
		items,
		meta: {
			limit: null,
			total: items.length,
			next_cursor: null,
			prev_cursor: null,
		},
	};
}

export { paginate, unpaginated };
export type { PaginatedSlice };
