const nearestIndex = (positions: number[], x: number): number => {
	if (positions.length === 0) {
		return -1;
	}

	let best = 0;
	positions.forEach((position, index) => {
		const distance = Math.abs(position - x);
		const bestDistance = Math.abs(positions[best] - x);

		if (distance < bestDistance) {
			best = index;
		}
	});

	return best;
};

export { nearestIndex };
