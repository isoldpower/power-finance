// Compact page list: all pages when few, else first/last + a window around the current page.
const buildPages = (current: number, count: number): (number | 'gap')[] => {
	if (count <= 7) return Array.from({ length: count }, (_, index) => index + 1);
	const pages: (number | 'gap')[] = [1];
	const start = Math.max(2, current - 1);
	const end = Math.min(count - 1, current + 1);
	if (start > 2) pages.push('gap');
	for (let page = start; page <= end; page += 1) pages.push(page);
	if (end < count - 1) pages.push('gap');
	pages.push(count);
	return pages;
};

export { buildPages };
