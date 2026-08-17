import { UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const GoalSkeletonAmounts: FC = () => (
	<UiSkeleton className="h-4 w-16" />
);

GoalSkeletonAmounts.displayName = 'GoalSkeletonAmounts';

export { GoalSkeletonAmounts };
