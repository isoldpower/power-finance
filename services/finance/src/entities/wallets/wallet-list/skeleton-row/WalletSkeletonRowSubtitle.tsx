import { SkeletonText } from "@internal/shared";

import type { FC } from "react";


const WalletSkeletonRowSubtitle: FC = () => (
	<SkeletonText size="11" width="w-1/2" />
);

WalletSkeletonRowSubtitle.displayName = 'WalletSkeletonRowSubtitle';

export { WalletSkeletonRowSubtitle };
