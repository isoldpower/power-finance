import type { Page } from "@shared/api";


interface Identified {
	id: string;
}

const mapInPage = <TItem extends Identified>(
	page: Page<TItem>,
	id: string,
	project: (item: TItem) => TItem,
): Page<TItem> => ({
	...page,
	items: page.items.map((item) => (item.id === id ? project(item) : item)),
});

const swapInPage = <TItem extends Identified>(
	page: Page<TItem>,
	id: string,
	item: TItem,
): Page<TItem> => mapInPage(page, id, () => item);

const prependToPage = <TItem extends Identified>(
	page: Page<TItem>,
	item: TItem,
): Page<TItem> => {
	if (page.items.some((existing) => existing.id === item.id)) return page;

	return { ...page, items: [item, ...page.items], total: page.total + 1 };
};

const dropFromPage = <TItem extends Identified>(
	page: Page<TItem>,
	id: string,
): Page<TItem> => {
	const items = page.items.filter((item) => item.id !== id);
	if (items.length === page.items.length) return page;

	return { ...page, items, total: Math.max(page.total - 1, 0) };
};

export { dropFromPage, mapInPage, prependToPage, swapInPage };
export type { Identified };
