import { cn, UiSkeleton } from "@internal/ui-library";
import { SkeletonText } from "@shared/pure-components/feedback";

import type { FC } from "react";


const WalletDetailsSkeletonRow: FC = () => (
	<div
		className={cn(
			"flex items-center gap-3 border-b border-border px-[18px] py-2.5"
		)}
	>
		<UiSkeleton className="size-[30px] flex-none rounded-[8px] border border-border-strong" />
		<div className="min-w-0 flex-1">
			<SkeletonText size="13" width="w-2/5" />
			<SkeletonText size="11" width="w-1/2" />
		</div>
		<div className="flex flex-col items-end leading-tight">
			<SkeletonText size="sm" family="display" width="w-16" />
			<SkeletonText size="10.5" family="numeric" width="w-12" />
		</div>
	</div>
);

WalletDetailsSkeletonRow.displayName = 'WalletDetailsSkeletonRow';

export { WalletDetailsSkeletonRow };
