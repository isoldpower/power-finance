import { SkeletonText } from "@shared/pure-components/feedback";

import type { FC } from "react";


const WalletDetailsSkeletonTitle: FC = () => (
	<SkeletonText size="lg" family="display" width="w-2/5" />
);

WalletDetailsSkeletonTitle.displayName = 'WalletDetailsSkeletonTitle';

export { WalletDetailsSkeletonTitle };
