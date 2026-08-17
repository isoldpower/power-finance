import { UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const GoalSkeletonBar: FC = () => (
	<UiSkeleton className="h-2 flex-1 rounded-full" />
);

GoalSkeletonBar.displayName = 'GoalSkeletonBar';

export { GoalSkeletonBar };
