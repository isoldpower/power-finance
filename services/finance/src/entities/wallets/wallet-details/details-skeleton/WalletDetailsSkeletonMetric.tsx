import { SkeletonText } from "@shared/pure-components/feedback";

import type { FC } from "react";


const WalletDetailsSkeletonMetric: FC = () => (
	<div>
		<SkeletonText size="11" width="w-16" />
		<SkeletonText family="display" width="w-20" className="text-[17px]" />
	</div>
);

WalletDetailsSkeletonMetric.displayName = 'WalletDetailsSkeletonMetric';

export { WalletDetailsSkeletonMetric };
