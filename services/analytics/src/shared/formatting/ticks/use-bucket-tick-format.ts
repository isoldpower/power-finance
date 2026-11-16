import { useCallback } from "react";
import { useDateFormat } from "../dates";

import type { BucketUnit } from "../dates";


interface BucketPoint {
	start: string;
}

const useBucketTickFormat = (points: BucketPoint[], granularity: BucketUnit): ((value: unknown) => string) => {
	const { formatBucket } = useDateFormat();

	return useCallback((value: unknown) => {
		const point = points[Number(value)] as BucketPoint | undefined;

		return point ? formatBucket(point.start, granularity) : '';
	}, [points, formatBucket, granularity]);
};

export { useBucketTickFormat };
