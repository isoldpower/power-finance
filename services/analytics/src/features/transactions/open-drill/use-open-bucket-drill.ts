import { useCallback } from "react";
import { useAnalyticsFilters } from "@feature/filters";

import type { Granularity } from "@entity/filters";
import type { CashFlowBucket } from "@entity/flow";


const useOpenBucketDrill = (granularity: Granularity): ((bucket: CashFlowBucket) => void) => {
	const openDrill = useAnalyticsFilters((state) => state.openDrill);

	return useCallback((bucket: CashFlowBucket) => {
		openDrill({
			kind: 'bucket',
			range: { since: bucket.start, until: bucket.end },
			granularity,
		});
	}, [openDrill, granularity]);
};

export { useOpenBucketDrill };
