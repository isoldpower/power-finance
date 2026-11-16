import { InsightCardSkeleton, InsightGrid } from "@entity/overview";

import type { FC } from "react";


const INSIGHT_SKELETON_COUNT = 4;

const InsightsListSkeleton: FC = () => (
	<InsightGrid>
		{Array.from({ length: INSIGHT_SKELETON_COUNT }, (_, index) => <InsightCardSkeleton key={index} />)}
	</InsightGrid>
);

InsightsListSkeleton.displayName = 'InsightsListSkeleton';

export { InsightsListSkeleton };
