import { UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const GoalSkeletonName: FC = () => (
	<UiSkeleton className="h-3.5 w-1/3" />
);

GoalSkeletonName.displayName = 'GoalSkeletonName';

export { GoalSkeletonName };
