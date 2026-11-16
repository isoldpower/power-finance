import { SkeletonText } from "@internal/shared";

import type { FC } from "react";


const LedgerLineSkeletonAmount: FC = () => (
	<SkeletonText size="13" family="display" width="w-16" />
);

LedgerLineSkeletonAmount.displayName = 'LedgerLineSkeletonAmount';

export { LedgerLineSkeletonAmount };
