interface Pending {
	pending?: boolean;
}

const isPending = (item: unknown): boolean => {
	return typeof item === 'object' && 
		item !== null && 
		(item as Pending).pending === true;
};

const markPending = <TItem extends object>(item: TItem): TItem => ({ 
	...item,
	pending: true,
});

const clearPending = <TItem extends object>(item: TItem): TItem => {
	if (!isPending(item)) return item;

	const settled = { ...item } as Record<string, unknown>;
	delete settled.pending;

	return settled as TItem;
};

export { clearPending, isPending, markPending };
export type { Pending };
