import { SkeletonText } from "@internal/shared";

import type { FC } from "react";


const WalletDetailsSkeletonSubtitle: FC = () => (
	<SkeletonText size="12.5" width="w-3/5" />
);

WalletDetailsSkeletonSubtitle.displayName = 'WalletDetailsSkeletonSubtitle';

export { WalletDetailsSkeletonSubtitle };
