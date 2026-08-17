import { cn, UiSkeleton } from "@internal/ui-library";
import { SkeletonText } from "@shared/pure-components/feedback";

import type { FC } from "react";


const ActivityFeedSkeletonRow: FC = () => (
	<div
		className={cn(
			"flex items-center gap-3 border-b border-border px-[18px] py-2.5 last:border-b-0"
		)}
	>
		<UiSkeleton className="size-8 flex-none rounded-[8px]" />
		<div className="min-w-0 flex-1">
			<SkeletonText size="13.5" width="w-2/5" />
			<SkeletonText size="11.5" width="w-3/5" />
		</div>
		<div className="text-right">
			<div className="flex flex-col items-end leading-tight">
				<SkeletonText size="sm" family="display" width="w-16" />
				<SkeletonText size="10.5" family="numeric" width="w-12" />
			</div>
			<SkeletonText size="10.5" family="numeric" width="w-10" className="ml-auto" />
		</div>
	</div>
);

ActivityFeedSkeletonRow.displayName = 'ActivityFeedSkeletonRow';

export { ActivityFeedSkeletonRow };
