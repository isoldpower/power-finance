import { UiSkeleton } from "@internal/ui-library";
import { SkeletonText } from "@shared/pure-components/feedback";

import type { FC } from "react";


const WalletSkeletonRow: FC = () => (
	<div className="flex items-center gap-[11px] border-l-[3px] border-l-transparent px-3.5 py-[11px]">
		<UiSkeleton className="h-[26px] w-[38px] flex-none rounded-[6px]" />
		<div className="min-w-0 flex-1">
			<SkeletonText size="13.5" width="w-2/5" />
			<SkeletonText size="11" width="w-1/2" />
		</div>
		<SkeletonText size="13.5" family="numeric" width="w-14" />
		<UiSkeleton className="size-[26px] flex-none rounded-[7px]" />
	</div>
);

WalletSkeletonRow.displayName = 'WalletSkeletonRow';

export { WalletSkeletonRow };
