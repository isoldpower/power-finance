import type { FC } from "react";
import { UiSkeleton } from "@internal/ui-library";

const AutomationSkeletonRow: FC = () => (
	<div className="flex items-center gap-3 border-b border-border px-[18px] py-3.5 last:border-b-0">
		<UiSkeleton className="size-[34px] flex-none rounded-[9px]" />
		<div className="min-w-0 flex-1 space-y-1.5">
			<UiSkeleton className="h-3.5 w-1/2" />
			<UiSkeleton className="h-3 w-3/4" />
		</div>
		<UiSkeleton className="h-5 w-9 flex-none rounded-full" />
	</div>
);

AutomationSkeletonRow.displayName = 'AutomationSkeletonRow';

export { AutomationSkeletonRow };
