import { MAX_VISIBLE_PAGES } from "./config.ts";

import type { PageEntry } from "./types.ts";


const toPageEntries = (
	currentPage: number,
	pageCount: number,
): PageEntry[] => {
	if (pageCount <= MAX_VISIBLE_PAGES) {
		return Array.from({ length: pageCount }, (_, index) => index + 1);
	}

	const firstPage = 1;
	const lastPage = pageCount;
	
	const start = Math.max(firstPage + 1, currentPage - 1);
	const end = Math.min(lastPage - 1, currentPage + 1);

	const entries: PageEntry[] = [firstPage];
	if (start > firstPage + 1) {
		entries.push('gap');
	}

	for (let page = start; page <= end; page += 1) {
		entries.push(page);
	}

	if (end < lastPage - 1) {
		entries.push('gap');
	}

	entries.push(lastPage);
	return entries;
};

export { toPageEntries };
