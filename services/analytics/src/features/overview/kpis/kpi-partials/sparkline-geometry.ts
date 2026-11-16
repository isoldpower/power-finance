import { SPARK_HEIGHT, SPARK_PADDING, SPARK_WIDTH } from "@entity/overview";


interface SparklineGeometry {
	line: string;
	area: string;
}

const EMPTY_SPARKLINE: SparklineGeometry = { line: '', area: '' };

const sparklineGeometry = (values: number[]): SparklineGeometry => {
	if (values.length < 2) {
		return EMPTY_SPARKLINE;
	}

	const lowest = Math.min(...values);
	const highest = Math.max(...values);
	const spread = highest - lowest;
	const span = spread === 0 ? 1 : spread;
	const lastIndex = values.length - 1;
	const drawableHeight = SPARK_HEIGHT - SPARK_PADDING * 2;

	const points = values.map((value, index) => {
		const x = (index / lastIndex) * SPARK_WIDTH;
		const heightShare = 1 - (value - lowest) / span;
		const y = SPARK_PADDING + heightShare * drawableHeight;

		return `${x.toFixed(2)},${y.toFixed(2)}`;
	});
	const line = `M${points.join(' L')}`;
	const width = SPARK_WIDTH.toString();
	const height = SPARK_HEIGHT.toString();

	return {
		line,
		area: `${line} L${width},${height} L0,${height} Z`,
	};
};

export { sparklineGeometry };
export type { SparklineGeometry };
