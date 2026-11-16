const MINIMUM_POINTS_FOR_TREND = 3;
const BANDWIDTH_SHARE_OF_SERIES = 1 / 8;
const MINIMUM_BANDWIDTH_IN_BUCKETS = 1;

const gaussianWeight = (distance: number, bandwidth: number): number => (
	Math.exp(-(distance * distance) / (2 * bandwidth * bandwidth))
);

const smoothTrend = (values: number[]): number[] | null => {
	if (values.length < MINIMUM_POINTS_FOR_TREND) {
		return null;
	}

	const bandwidth = Math.max(MINIMUM_BANDWIDTH_IN_BUCKETS, values.length * BANDWIDTH_SHARE_OF_SERIES);

	return values.map((_, targetIndex) => {
		let weightedSum = 0;
		let weightTotal = 0;
		values.forEach((value, sourceIndex) => {
			const weight = gaussianWeight(sourceIndex - targetIndex, bandwidth);
			weightedSum += weight * value;
			weightTotal += weight;
		});

		return weightedSum / weightTotal;
	});
};

export { smoothTrend };
