import { SkeletonText } from "@internal/shared";

import type { FC } from "react";


const WalletSkeletonRowTitle: FC = () => (
	<SkeletonText size="13.5" width="w-2/5" />
);

WalletSkeletonRowTitle.displayName = 'WalletSkeletonRowTitle';

export { WalletSkeletonRowTitle };
