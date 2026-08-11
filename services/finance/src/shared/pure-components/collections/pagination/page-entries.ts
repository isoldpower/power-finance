type PageEntry = number | 'gap';

const MAX_VISIBLE_PAGES = 7;

const toPageEntries = (currentPage: number, pageCount: number): PageEntry[] => {
	if (pageCount <= MAX_VISIBLE_PAGES) {
		return Array.from({ length: pageCount }, (_, index) => index + 1);
	}

	const first = 1;
	const last = pageCount;
	const start = Math.max(first + 1, currentPage - 1);
	const end = Math.min(last - 1, currentPage + 1);

	const entries: PageEntry[] = [first];

	if (start > first + 1) {
		entries.push('gap');
	}

	for (let page = start; page <= end; page += 1) {
		entries.push(page);
	}

	if (end < last - 1) {
		entries.push('gap');
	}

	entries.push(last);

	return entries;
};

export { toPageEntries };
export type { PageEntry };
