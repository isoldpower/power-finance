import type { FC } from "react";
import { UiSkeleton } from "@internal/ui-library";

const GoalSkeletonRow: FC = () => (
	<div className="border-b border-border px-[18px] py-3.5 last:border-b-0">
		<div className="mb-2.5 flex items-center gap-3">
			<UiSkeleton className="size-9 flex-none rounded-[10px]" />
			<div className="min-w-0 flex-1 space-y-1.5">
				<UiSkeleton className="h-3.5 w-1/3" />
				<UiSkeleton className="h-3 w-1/2" />
			</div>
			<UiSkeleton className="h-4 w-16" />
		</div>
		<div className="flex h-5 items-center gap-2.5">
			<UiSkeleton className="h-2 flex-1 rounded-full" />
			<UiSkeleton className="h-3 w-8 rounded" />
		</div>
	</div>
);

GoalSkeletonRow.displayName = 'GoalSkeletonRow';

export { GoalSkeletonRow };
