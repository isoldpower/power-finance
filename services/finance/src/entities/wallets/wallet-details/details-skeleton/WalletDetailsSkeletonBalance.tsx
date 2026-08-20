import { SkeletonText } from "@shared/pure-components/feedback";

import type { FC } from "react";


const WalletDetailsSkeletonBalance: FC = () => (
	<div className="flex flex-col">
		<SkeletonText size="10" width="w-14" />
		<div className="flex flex-col items-start leading-tight">
			<SkeletonText family="display" width="w-40" className="text-[30px]" />
			<SkeletonText size="10.5" family="numeric" width="w-24" />
		</div>
	</div>
);

WalletDetailsSkeletonBalance.displayName = 'WalletDetailsSkeletonBalance';

export { WalletDetailsSkeletonBalance };
