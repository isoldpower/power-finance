import { SkeletonText } from "@shared/pure-components/feedback";

import type { FC } from "react";


const LedgerLineSkeletonKind: FC = () => (
	<SkeletonText size="9" width="w-10" />
);

LedgerLineSkeletonKind.displayName = 'LedgerLineSkeletonKind';

export { LedgerLineSkeletonKind };
