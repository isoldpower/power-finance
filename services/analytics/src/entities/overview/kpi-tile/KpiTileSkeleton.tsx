import { FinanceCard } from "@internal/ui-library";
import { SkeletonText } from "@internal/shared";

import type { FC } from "react";


const KpiTileSkeleton: FC = () => (
	<FinanceCard className="flex flex-col gap-2 px-[18px] pb-3 pt-4">
		<SkeletonText size="11" width="w-20" />
		<SkeletonText size="19" family="display" width="w-28" />
		<SkeletonText size="11" width="w-16" />
		<span className="mt-1 block h-8 w-full animate-pulse rounded-md bg-accent" />
	</FinanceCard>
);

KpiTileSkeleton.displayName = 'KpiTileSkeleton';

export { KpiTileSkeleton };
