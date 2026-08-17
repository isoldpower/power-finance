import { UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const LedgerLineSkeletonSide: FC = () => (
	<UiSkeleton className="h-4 w-8 rounded-full" />
);

LedgerLineSkeletonSide.displayName = 'LedgerLineSkeletonSide';

export { LedgerLineSkeletonSide };
