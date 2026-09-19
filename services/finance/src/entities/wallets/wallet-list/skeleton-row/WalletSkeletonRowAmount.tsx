import { SkeletonText } from "@shared/pure-components/feedback";

import type { FC } from "react";


const WalletSkeletonRowAmount: FC = () => (
	<SkeletonText size="13.5" family="numeric" width="w-14" />
);

WalletSkeletonRowAmount.displayName = 'WalletSkeletonRowAmount';

export { WalletSkeletonRowAmount };
