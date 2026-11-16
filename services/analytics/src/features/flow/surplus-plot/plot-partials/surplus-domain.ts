const surplusDomain = (inflows: number[], outflows: number[]): [number, number] => {
	const highest = Math.max(1, ...inflows, ...outflows);

	return [0, highest];
};

export { surplusDomain };
