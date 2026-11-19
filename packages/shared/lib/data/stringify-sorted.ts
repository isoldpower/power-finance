function sortObjectKeys(target: unknown): unknown {
	if (typeof target !== 'object' || target === null) {
		return target;
	} else if (Array.isArray(target)) {
		return target.map(sortObjectKeys);
	} else {
		return Object.keys(target).sort().reduce((sorted: Record<string, unknown>, key) => {
			const targetParsed = target as Record<string, unknown>;
			sorted[key] = sortObjectKeys(targetParsed[key]);
			
			return sorted;
		}, {});
	}
}

function stringifySorted(target: unknown): string {
	return JSON.stringify(sortObjectKeys(target));
}

export { stringifySorted };