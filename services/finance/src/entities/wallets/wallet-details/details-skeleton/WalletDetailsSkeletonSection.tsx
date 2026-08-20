import { SkeletonText } from "@shared/pure-components/feedback";

import type { FC } from "react";


const WalletDetailsSkeletonSection: FC = () => (
	<div className="px-[18px] pb-1 pt-3.5">
		<SkeletonText size="13.5" width="w-36" />
	</div>
);

WalletDetailsSkeletonSection.displayName = 'WalletDetailsSkeletonSection';

export { WalletDetailsSkeletonSection };
