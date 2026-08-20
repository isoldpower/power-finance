import { SkeletonText } from "@shared/pure-components/feedback";

import type { FC } from "react";


const LedgerLineSkeletonAccount: FC = () => (
	<SkeletonText size="12.5" width="w-1/3" className="min-w-0 flex-1" />
);

LedgerLineSkeletonAccount.displayName = 'LedgerLineSkeletonAccount';

export { LedgerLineSkeletonAccount };
