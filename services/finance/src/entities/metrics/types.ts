type Period = '1W' | '1M' | '3M' | '1Y';

interface SparklinePoint {
	xPct: number;
	yPct: number;
}

export type { Period, SparklinePoint };