import { UiSkeleton } from "@internal/ui-library";

import type { FC } from "react";


const GoalSkeletonEta: FC = () => (
	<UiSkeleton className="h-3 w-1/2" />
);

GoalSkeletonEta.displayName = 'GoalSkeletonEta';

export { GoalSkeletonEta };
