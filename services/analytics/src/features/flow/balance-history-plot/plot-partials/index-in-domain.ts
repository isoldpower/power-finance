const indexInDomain = (index: number | null, [start, end]: [number, number]): number | null => {
	if (index === null) {
		return null;
	}

	const inside = index >= start && index <= end;

	return inside ? index : null;
};

export { indexInDomain };
