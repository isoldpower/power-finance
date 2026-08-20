import { UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const WalletFormSkeletonPreview: FC = () => (
	<UiSkeleton className="mb-5 h-[120px] w-full rounded-[12px] border border-border-strong" />
);

WalletFormSkeletonPreview.displayName = 'WalletFormSkeletonPreview';

export { WalletFormSkeletonPreview };
