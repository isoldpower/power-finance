import { SkeletonText } from "@internal/shared";

import type { FC } from "react";


const InsightCardSkeleton: FC = () => (
	<div className="flex flex-col gap-1.5 rounded-[var(--radius-lg)] border border-border px-4 py-3.5">
		<SkeletonText size="13.5" width="w-40" />
		<SkeletonText size="12" width="w-56" />
	</div>
);

InsightCardSkeleton.displayName = 'InsightCardSkeleton';

export { InsightCardSkeleton };
