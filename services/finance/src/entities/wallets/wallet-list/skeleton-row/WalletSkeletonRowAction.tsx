import { UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const WalletSkeletonRowAction: FC = () => (
	<UiSkeleton className="size-[26px] flex-none rounded-[7px]" />
);

WalletSkeletonRowAction.displayName = 'WalletSkeletonRowAction';

export { WalletSkeletonRowAction };
