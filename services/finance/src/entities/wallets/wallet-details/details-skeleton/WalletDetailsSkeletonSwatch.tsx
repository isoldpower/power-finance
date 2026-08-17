import { UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const WalletDetailsSkeletonSwatch: FC = () => (
	<UiSkeleton className="h-11 w-16 flex-none rounded-[9px] border border-border-strong" />
);

WalletDetailsSkeletonSwatch.displayName = 'WalletDetailsSkeletonSwatch';

export { WalletDetailsSkeletonSwatch };
