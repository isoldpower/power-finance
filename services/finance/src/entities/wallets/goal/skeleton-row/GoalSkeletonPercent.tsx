import { UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const GoalSkeletonPercent: FC = () => (
	<UiSkeleton className="h-3 w-8 rounded" />
);

GoalSkeletonPercent.displayName = 'GoalSkeletonPercent';

export { GoalSkeletonPercent };
