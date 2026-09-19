import { UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const WalletSkeletonRowThumbnail: FC = () => (
	<UiSkeleton className="h-[26px] w-[38px] flex-none rounded-[6px]" />
);

WalletSkeletonRowThumbnail.displayName = 'WalletSkeletonRowThumbnail';

export { WalletSkeletonRowThumbnail };
